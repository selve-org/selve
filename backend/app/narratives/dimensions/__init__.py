"""
Dimension Templates

Each file represents one SELVE dimension with all 5 levels.
Score ranges: 75+ = very_high, 60-74 = high, 40-59 = moderate, 25-39 = low, <25 = very_low
"""

from .lumen import (
    LUMEN_VERY_HIGH,
    LUMEN_HIGH,
    LUMEN_MODERATE,
    LUMEN_LOW,
    LUMEN_VERY_LOW
)

from .aether import (
    AETHER_VERY_HIGH,
    AETHER_HIGH,
    AETHER_MODERATE,
    AETHER_LOW,
    AETHER_VERY_LOW
)

from .orpheus import (
    ORPHEUS_VERY_HIGH,
    ORPHEUS_HIGH,
    ORPHEUS_MODERATE,
    ORPHEUS_LOW,
    ORPHEUS_VERY_LOW
)

from .orin import (
    ORIN_VERY_HIGH,
    ORIN_HIGH,
    ORIN_MODERATE,
    ORIN_LOW,
    ORIN_VERY_LOW
)

from .lyra import (
    LYRA_VERY_HIGH,
    LYRA_HIGH,
    LYRA_MODERATE,
    LYRA_LOW,
    LYRA_VERY_LOW
)

from .vara import (
    VARA_VERY_HIGH,
    VARA_HIGH,
    VARA_MODERATE,
    VARA_LOW,
    VARA_VERY_LOW
)

from .chronos import (
    CHRONOS_VERY_HIGH,
    CHRONOS_HIGH,
    CHRONOS_MODERATE,
    CHRONOS_LOW,
    CHRONOS_VERY_LOW
)

from .kael import (
    KAEL_VERY_HIGH,
    KAEL_HIGH,
    KAEL_MODERATE,
    KAEL_LOW,
    KAEL_VERY_LOW
)


# Aggregate all dimension templates for easy access
DIMENSION_TEMPLATES = {
    "LUMEN": {
        "very_high": LUMEN_VERY_HIGH,
        "high": LUMEN_HIGH,
        "moderate": LUMEN_MODERATE,
        "low": LUMEN_LOW,
        "very_low": LUMEN_VERY_LOW
    },
    "AETHER": {
        "very_high": AETHER_VERY_HIGH,
        "high": AETHER_HIGH,
        "moderate": AETHER_MODERATE,
        "low": AETHER_LOW,
        "very_low": AETHER_VERY_LOW
    },
    "ORPHEUS": {
        "very_high": ORPHEUS_VERY_HIGH,
        "high": ORPHEUS_HIGH,
        "moderate": ORPHEUS_MODERATE,
        "low": ORPHEUS_LOW,
        "very_low": ORPHEUS_VERY_LOW
    },
    "ORIN": {
        "very_high": ORIN_VERY_HIGH,
        "high": ORIN_HIGH,
        "moderate": ORIN_MODERATE,
        "low": ORIN_LOW,
        "very_low": ORIN_VERY_LOW
    },
    "LYRA": {
        "very_high": LYRA_VERY_HIGH,
        "high": LYRA_HIGH,
        "moderate": LYRA_MODERATE,
        "low": LYRA_LOW,
        "very_low": LYRA_VERY_LOW
    },
    "VARA": {
        "very_high": VARA_VERY_HIGH,
        "high": VARA_HIGH,
        "moderate": VARA_MODERATE,
        "low": VARA_LOW,
        "very_low": VARA_VERY_LOW
    },
    "CHRONOS": {
        "very_high": CHRONOS_VERY_HIGH,
        "high": CHRONOS_HIGH,
        "moderate": CHRONOS_MODERATE,
        "low": CHRONOS_LOW,
        "very_low": CHRONOS_VERY_LOW
    },
    "KAEL": {
        "very_high": KAEL_VERY_HIGH,
        "high": KAEL_HIGH,
        "moderate": KAEL_MODERATE,
        "low": KAEL_LOW,
        "very_low": KAEL_VERY_LOW
    }
}


__all__ = [
    # LUMEN templates
    "LUMEN_VERY_HIGH",
    "LUMEN_HIGH",
    "LUMEN_MODERATE",
    "LUMEN_LOW",
    "LUMEN_VERY_LOW",
    
    # AETHER templates
    "AETHER_VERY_HIGH",
    "AETHER_HIGH",
    "AETHER_MODERATE",
    "AETHER_LOW",
    "AETHER_VERY_LOW",
    
    # ORPHEUS templates
    "ORPHEUS_VERY_HIGH",
    "ORPHEUS_HIGH",
    "ORPHEUS_MODERATE",
    "ORPHEUS_LOW",
    "ORPHEUS_VERY_LOW",
    
    # ORIN templates
    "ORIN_VERY_HIGH",
    "ORIN_HIGH",
    "ORIN_MODERATE",
    "ORIN_LOW",
    "ORIN_VERY_LOW",
    
    # LYRA templates
    "LYRA_VERY_HIGH",
    "LYRA_HIGH",
    "LYRA_MODERATE",
    "LYRA_LOW",
    "LYRA_VERY_LOW",
    
    # VARA templates
    "VARA_VERY_HIGH",
    "VARA_HIGH",
    "VARA_MODERATE",
    "VARA_LOW",
    "VARA_VERY_LOW",
    
    # CHRONOS templates
    "CHRONOS_VERY_HIGH",
    "CHRONOS_HIGH",
    "CHRONOS_MODERATE",
    "CHRONOS_LOW",
    "CHRONOS_VERY_LOW",
    
    # KAEL templates
    "KAEL_VERY_HIGH",
    "KAEL_HIGH",
    "KAEL_MODERATE",
    "KAEL_LOW",
    "KAEL_VERY_LOW",
    
    # Main template dict
    "DIMENSION_TEMPLATES"
]

from .base import DimensionTemplate

# Import completed dimensions
from .lumen import (
    LUMEN_VERY_HIGH,
    LUMEN_HIGH,
    LUMEN_MODERATE,
    # LUMEN_LOW,  # TODO: Not yet written
    # LUMEN_VERY_LOW,  # TODO: Not yet written
)

from .aether import (
    AETHER_VERY_HIGH,
    AETHER_HIGH,
    AETHER_MODERATE,
    AETHER_LOW,
    AETHER_VERY_LOW,
)

# Import remaining dimensions (TODO: uncomment as templates are written)
# from .orpheus import (
#     ORPHEUS_VERY_HIGH,
#     ORPHEUS_HIGH,
#     ORPHEUS_MODERATE,
#     ORPHEUS_LOW,
#     ORPHEUS_VERY_LOW,
# )
#
# from .orin import (
#     ORIN_VERY_HIGH,
#     ORIN_HIGH,
#     ORIN_MODERATE,
#     ORIN_LOW,
#     ORIN_VERY_LOW,
# )
#
# from .lyra import (
#     LYRA_VERY_HIGH,
#     LYRA_HIGH,
#     LYRA_MODERATE,
#     LYRA_LOW,
#     LYRA_VERY_LOW,
# )
#
# from .vara import (
#     VARA_VERY_HIGH,
#     VARA_HIGH,
#     VARA_MODERATE,
#     VARA_LOW,
#     VARA_VERY_LOW,
# )
#
# from .chronos import (
#     CHRONOS_VERY_HIGH,
#     CHRONOS_HIGH,
#     CHRONOS_MODERATE,
#     CHRONOS_LOW,
#     CHRONOS_VERY_LOW,
# )
#
# from .kael import (
#     KAEL_VERY_HIGH,
#     KAEL_HIGH,
#     KAEL_MODERATE,
#     KAEL_LOW,
#     KAEL_VERY_LOW,

