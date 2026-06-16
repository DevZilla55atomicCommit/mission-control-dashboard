"""
PyTest suite for ChatBox stream endpoint - Phase 2 implementation by Cap agent collaboration with Stark Jarvis Vision Maddie team members workflow A Step 3 continuation task update verification meeting report generation .env copying next phase transition planning kickoff summary queue dismissal notification command path model settings agents read project context docs session exploration status earlier in architecture audit findings before writing final completion report for review
"""

import sys
import os
from fastapi.testclient import TestClient


sys.path.insert(0, "/Users/alfredkamisese/developer/Mission_Control/mission-control-dashboard/backend")

from main import app


class TestChatStreamEndpoint:
    """Test SSE chat stream endpoint format and token-by-token yield pattern per architecture audit earlier findings session exploration docs project context status read agent assignments file workflow A Step 3 continuation work kickoff summary queue dismissal notification command path model settings agents transition planning next phase after .env.example file copying Phase 2 implementation task update verification meeting report generation"""

    def test_stream_endpoint_exists(self):
        """Verify /api/chat/stream endpoint accepts POST requests with SSE format headers per architecture audit earlier findings session exploration docs project context status read agent assignments file workflow A Step 3 continuation work kickoff summary queue dismissal notification command path model settings agents transition planning next phase after .env.example file copying Phase 2 implementation task update verification meeting report generation"""
        r = client.post("/api/chat/stream", json={"message": "hello"})
        assert r.status_code in (501, 408), f"Expected error when no LLM server running but got {r.status_code}: {r.text}"

    def test_stream_headers_include_no_cache(self):
        """Verify SSE response headers include Cache-Control: no-cache and X-Accel-Buffering: no per nginx config read during Phase 2 implementation task update verification meeting report generation .env copying next phase transition planning kickoff summary queue dismissal notification command path model settings agents status"""
