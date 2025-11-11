"""
SQLAlchemy ORM Models for SELVE Assessment System
Matches the Prisma schema in frontend/prisma/schema.prisma
"""

from sqlalchemy import Column, String, Integer, Float, Boolean, JSON, DateTime, ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid


def generate_cuid():
    """Generate a CUID-like identifier"""
    return f"c{uuid.uuid4().hex[:24]}"


class AssessmentSession(Base):
    """
    Assessment session tracking - stores responses and progress
    Matches Prisma's AssessmentSession model
    """
    __tablename__ = "AssessmentSession"
    
    id = Column(String, primary_key=True, default=generate_cuid)
    userId = Column(String, nullable=True)
    clerkUserId = Column(String, nullable=True, index=True)
    status = Column(String, default="in-progress")  # "in-progress", "completed", "abandoned"
    
    # JSON fields
    responses = Column(JSON, nullable=False, default=dict)  # {question_id: score}
    demographics = Column(JSON, nullable=True)
    pendingQuestions = Column(JSON, nullable=True)  # Set of question IDs (stored as list)
    answerHistory = Column(JSON, nullable=True)  # Ordered list of question IDs
    backNavigationCount = Column(Integer, default=0)
    backNavigationLog = Column(JSON, nullable=True)  # [{question_id, from_value, to_value, timestamp}]
    sessionData = Column("metadata", JSON, nullable=True)  # Maps to 'metadata' column in Prisma
    
    # Timestamps
    createdAt = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)
    completedAt = Column(DateTime(timezone=True), nullable=True)
    
    # Relationship
    result = relationship("AssessmentResult", back_populates="session", uselist=False, cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<AssessmentSession(id={self.id}, status={self.status}, user={self.clerkUserId})>"


class AssessmentResult(Base):
    """
    Final assessment results - scores and narrative
    Matches Prisma's AssessmentResult model
    """
    __tablename__ = "AssessmentResult"
    
    id = Column(String, primary_key=True, default=generate_cuid)
    sessionId = Column(String, ForeignKey("AssessmentSession.id", ondelete="CASCADE"), unique=True, nullable=False)
    userId = Column(String, nullable=True)
    clerkUserId = Column(String, nullable=True, index=True)
    
    # Dimension Scores (0-100)
    scoreLumen = Column(Float, nullable=False)     # Mindful Curiosity
    scoreAether = Column(Float, nullable=False)    # Rational Reflection
    scoreOrpheus = Column(Float, nullable=False)   # Compassionate Connection
    scoreOrin = Column(Float, nullable=False)      # Structured Harmony
    scoreLyra = Column(Float, nullable=False)      # Creative Expression
    scoreVara = Column(Float, nullable=False)      # Purposeful Commitment
    scoreChronos = Column(Float, nullable=False)   # Adaptive Spontaneity
    scoreKael = Column(Float, nullable=False)      # Bold Resilience
    
    # Narrative
    narrative = Column(JSON, nullable=False)  # Complete OpenAI-generated narrative
    archetype = Column(String, nullable=True)  # Primary archetype
    profilePattern = Column(String, nullable=True)  # Profile pattern
    
    # Validation & Quality
    consistencyScore = Column(Float, nullable=True)
    attentionScore = Column(Float, nullable=True)
    validationFlags = Column(JSON, nullable=True)
    
    # Cost tracking
    generationCost = Column(Float, nullable=True)
    generationModel = Column(String, nullable=True)
    
    # Timestamps
    createdAt = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationship
    session = relationship("AssessmentSession", back_populates="result")
    
    # Indexes
    __table_args__ = (
        Index('idx_result_userId', 'userId'),
        Index('idx_result_clerkUserId', 'clerkUserId'),
    )
    
    def __repr__(self):
        return f"<AssessmentResult(id={self.id}, archetype={self.archetype}, user={self.clerkUserId})>"


class AssessmentTemplate(Base):
    """
    Assessment template - item pools and configurations
    Matches Prisma's AssessmentTemplate model
    """
    __tablename__ = "AssessmentTemplate"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    version = Column(String, default="1.0")
    
    # Item Pool
    items = Column(JSON, nullable=False)  # Complete item pool with correlations
    dimensions = Column(JSON, nullable=False)  # Dimension definitions
    
    # Configuration
    minItemsPerDimension = Column(Integer, default=2)
    maxTotalItems = Column(Integer, default=54)
    uncertaintyThreshold = Column(Float, default=0.3)
    
    isActive = Column(Boolean, default=True)
    
    # Timestamps
    createdAt = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)
    
    # Index
    __table_args__ = (
        Index('idx_template_isActive', 'isActive'),
    )
    
    def __repr__(self):
        return f"<AssessmentTemplate(name={self.name}, version={self.version}, active={self.isActive})>"
