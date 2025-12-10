export const GlobalAnimations = () => (
  <style jsx global>{`
        /* Neural Network - Step 1 */
        @keyframes neuralCurrent {
          0% { opacity: 0; stroke-dashoffset: 100; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; stroke-dashoffset: -100; }
        }
        .neural-current {
          stroke-dasharray: 20 200;
          animation: neuralCurrent 2s ease-in-out infinite;
        }
        @keyframes neuralPulse {
          0%, 100% { opacity: 0.8; r: 4; }
          50% { opacity: 1; r: 6; }
        }
        .neural-node-pulse {
          animation: neuralPulse 1.5s ease-in-out infinite;
        }

        /* Friend Connections - Step 2 */
        @keyframes friendCurrent {
          0% { stroke-dashoffset: 200; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .friend-current {
          stroke-dasharray: 30 300;
          animation: friendCurrent 2.5s ease-out infinite;
        }
        @keyframes centerPulse {
          0%, 100% { stroke-width: 2; filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
          50% { stroke-width: 3; filter: drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)); }
        }
        .center-node-pulse {
          animation: centerPulse 2s ease-in-out infinite;
        }

        /* Blueprint Fusion - Step 3 */
        @keyframes fusionCurrent1 {
          0% { stroke-dashoffset: 150; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .fusion-current-1 {
          stroke-dasharray: 30 200;
          animation: fusionCurrent1 3s ease-in-out infinite;
        }
        .fusion-current-2 {
          stroke-dasharray: 30 200;
          animation: fusionCurrent1 3s ease-in-out infinite 0.5s;
        }
        @keyframes fusionCurrent3 {
          0% { stroke-dashoffset: 100; opacity: 0; }
          30% { opacity: 0; }
          50% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .fusion-current-3 {
          stroke-dasharray: 20 100;
          animation: fusionCurrent3 3s ease-in-out infinite;
        }

        /* Coach Chat - Step 4 */
        @keyframes chatCurrentOut {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        .chat-current-out {
          stroke-dasharray: 20 200;
          animation: chatCurrentOut 2s ease-out infinite;
        }
        @keyframes chatCurrentIn {
          0% { stroke-dashoffset: -100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 100; opacity: 0; }
        }
        .chat-current-in {
          stroke-dasharray: 20 200;
          animation: chatCurrentIn 2s ease-out infinite 1s;
        }
        @keyframes processCurrent {
          0% { stroke-dashoffset: 50; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { stroke-dashoffset: -50; opacity: 0; }
        }
        .process-current-1 {
          stroke-dasharray: 15 100;
          animation: processCurrent 1.5s ease-in-out infinite;
        }
        .process-current-2 {
          stroke-dasharray: 15 100;
          animation: processCurrent 1.5s ease-in-out infinite 0.4s;
        }

        /* Outcome animations */
        @keyframes clarityBar {
          0% { width: 0; }
          100% { width: inherit; }
        }
        .clarity-bar {
          animation: clarityBar 1s ease-out forwards;
        }
        @keyframes alignmentMarker {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        .alignment-marker {
          animation: alignmentMarker 0.5s ease-out forwards;
        }
        @keyframes styleCurrent {
          0% { stroke-dashoffset: 100; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        .style-current {
          stroke-dasharray: 15 200;
          animation: styleCurrent 2s ease-in-out infinite;
        }
        .style-output-current {
          stroke-dasharray: 15 200;
          animation: styleCurrent 2s ease-in-out infinite 0.5s;
        }

        /* Roadmap */
        @keyframes roadmapCurrent {
          0% { stroke-dashoffset: 1400; }
          100% { stroke-dashoffset: 0; }
        }
        .roadmap-current {
          stroke-dasharray: 40 700;
          animation: roadmapCurrent 8s linear infinite;
        }
      `}</style>
);
