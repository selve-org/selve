(venv) christopher@EDESON:~/selve/backend$ make dev
▶️  Starting FastAPI server on http://localhost:8000
./venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
INFO:     Will watch for changes in these directories: ['/home/chris/selve/backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [108266] using WatchFiles
INFO:     Started server process [108268]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:53702 - "OPTIONS /api/assessment/start HTTP/1.1" 200 OK
INFO:     127.0.0.1:53702 - "POST /api/assessment/start HTTP/1.1" 200 OK
INFO:     127.0.0.1:53718 - "OPTIONS /api/assessment/start HTTP/1.1" 200 OK
INFO:     127.0.0.1:53702 - "POST /api/assessment/start HTTP/1.1" 200 OK
INFO:     127.0.0.1:53702 - "OPTIONS /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: demo_name
   Pending count: 0
INFO:     127.0.0.1:53718 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: demo_age
   Pending count: 0
INFO:     127.0.0.1:53718 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: demo_gender
   Pending count: 0
INFO:     127.0.0.1:53718 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: demo_country
   Pending count: 0
INFO:     127.0.0.1:53720 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: demo_drives
   Pending count: 0
INFO:     127.0.0.1:53720 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: demo_credit_cards
   Pending count: 0
INFO:     127.0.0.1:53724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: demo_has_yard
   Pending count: 0

✅ All demographics complete! Generating first personality batch...

======================================================================
📊 ADAPTIVE TESTING - Starting personality questions
======================================================================

🤔 Decision: CONTINUE
   Reason: Starting assessment

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE AETHER   | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • LUMEN    | XExpr6 | r=0.79 | I don't talk a lot....
   • LUMEN    | XExpr8 | r=0.75 | I say little....
   • LUMEN    | XExpr1 | r=0.74 | I talk a lot....
======================================================================

INFO:     127.0.0.1:50754 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: XExpr6
   Pending count: 3

======================================================================
📊 ADAPTIVE TESTING - Question #1 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 8 dimensions uncertain (avg uncertainty: 0.95)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.59 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE AETHER   | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • AETHER   | N6 | r=0.69 | I get upset easily....
   • AETHER   | N8 | r=0.69 | I have frequent mood swings....
   • AETHER   | N7 | r=0.65 | I change my mood a lot....
======================================================================

INFO:     127.0.0.1:50760 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: XExpr8
   Pending count: 5

======================================================================
📊 ADAPTIVE TESTING - Question #2 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 8 dimensions uncertain (avg uncertainty: 0.93)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.42 | Items: 2 | Recommended: +2
   🔴 NEEDS MORE AETHER   | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • AETHER   | N1 | r=0.65 | I get stressed out easily....
   • AETHER   | N9 | r=0.64 | I get irritated easily....
   • AETHER   | N10 | r=0.62 | I often feel blue....
======================================================================

INFO:     127.0.0.1:44686 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: XExpr1
   Pending count: 7

======================================================================
📊 ADAPTIVE TESTING - Question #3 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 8 dimensions uncertain (avg uncertainty: 0.92)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE AETHER   | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • AETHER   | N3 | r=0.56 | I worry about things....
   • AETHER   | N5 | r=0.50 | I am easily disturbed....
   • AETHER   | N2 | r=0.50 | I am relaxed most of the time....
======================================================================

INFO:     127.0.0.1:44700 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N6
   Pending count: 9

======================================================================
📊 ADAPTIVE TESTING - Question #4 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 8 dimensions uncertain (avg uncertainty: 0.87)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE AETHER   | Uncertainty: 0.59 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORPHEUS  | A4 | r=0.69 | I sympathize with others' feelings....
   • ORPHEUS  | A9 | r=0.63 | I feel others' emotions....
   • ORPHEUS  | A7 | r=0.62 | I am not really interested in others....
======================================================================

INFO:     127.0.0.1:44700 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N8
   Pending count: 11

======================================================================
📊 ADAPTIVE TESTING - Question #5 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 8 dimensions uncertain (avg uncertainty: 0.87)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE AETHER   | Uncertainty: 0.53 | Items: 2 | Recommended: +2
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORPHEUS  | A5 | r=0.61 | I am not interested in other people's problems....
   • ORPHEUS  | A8 | r=0.55 | I take time out for others....
   • ORPHEUS  | A2 | r=0.53 | I am interested in people....
======================================================================

INFO:     127.0.0.1:44700 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N7
   Pending count: 13

======================================================================
📊 ADAPTIVE TESTING - Question #6 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 8 dimensions uncertain (avg uncertainty: 0.84)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE AETHER   | Uncertainty: 0.31 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORPHEUS  | A6 | r=0.50 | I have a soft heart....
   • ORPHEUS  | A10 | r=0.42 | I make people feel at ease....
   • ORPHEUS  | A1 | r=0.39 | I feel little concern for others....
======================================================================

INFO:     127.0.0.1:44700 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N1
   Pending count: 15

======================================================================
📊 ADAPTIVE TESTING - Question #7 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.84)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.31 | Items: 4 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORPHEUS  | ORPHEUS_SC1 | r=0.68 | After disciplining a child, you immediately take t...
   • ORPHEUS  | ORPHEUS_SC2 | r=0.65 | You find it natural to play with children and feel...
   • ORPHEUS  | ORPHEUS_SC3 | r=0.63 | When someone shares their problems, you want to qu...
======================================================================

INFO:     127.0.0.1:44700 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N9
   Pending count: 17

======================================================================
📊 ADAPTIVE TESTING - Question #8 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.82)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.20 | Items: 5 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORPHEUS  | ORPHEUS_SC4 | r=0.66 | You have a natural aptitude for 'babying' and talk...
   • ORIN     | C5 | r=0.56 | I get chores done right away....
   • ORIN     | C6 | r=0.56 | I often forget to put things back in their proper ...
======================================================================

INFO:     127.0.0.1:44700 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N10
   Pending count: 19

======================================================================
📊 ADAPTIVE TESTING - Question #9 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.82)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.15 | Items: 6 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORIN     | C4 | r=0.54 | I make a mess of things....
   • ORIN     | C1 | r=0.54 | I am always prepared....
   • ORIN     | C9 | r=0.54 | I follow a schedule....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N3
   Pending count: 21

======================================================================
📊 ADAPTIVE TESTING - Question #10 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.82)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.13 | Items: 7 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🎯 Response Validation Check:
   Consistency Score: 100.0%
   Attention Score: 100.0%

📋 Next Questions (3 items):
   • ORIN     | C2 | r=0.48 | I leave my belongings around....
   • ORIN     | C8 | r=0.46 | I shirk my duties....
   • ORIN     | C7 | r=0.46 | I like order....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N5
   Pending count: 23

======================================================================
📊 ADAPTIVE TESTING - Question #11 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.81)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.12 | Items: 8 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORIN     | C10 | r=0.41 | I am exacting in my work....
   • ORIN     | C3 | r=0.35 | I pay attention to details....
   • ORIN     | ORIN_SC1 | r=0.64 | Before a trip, you study the map well in advance a...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: N2
   Pending count: 25

======================================================================
📊 ADAPTIVE TESTING - Question #12 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.81)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORIN     | ORIN_SC2 | r=0.62 | You have every receipt for the past five years, ev...
   • ORIN     | ORIN_SC3 | r=0.60 | You systemize everything and have a detailed budge...
   • ORIN     | ORIN_SC4 | r=0.58 | Your desk is messy and your files disorganized, bu...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A4
   Pending count: 27

======================================================================
📊 ADAPTIVE TESTING - Question #13 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.76)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 0.59 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • ORIN     | ORIN_SC5 | r=0.61 | You can be found on your hands and knees, 'manicur...
   • LYRA     | O10 | r=0.59 | I am full of ideas....
   • LYRA     | O1 | r=0.53 | I have a rich vocabulary....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A9
   Pending count: 29

======================================================================
📊 ADAPTIVE TESTING - Question #14 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.75)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 0.53 | Items: 2 | Recommended: +2
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

📋 Next Questions (3 items):
   • LYRA     | O2 | r=0.52 | I have difficulty understanding abstract ideas....
   • LYRA     | O5 | r=0.52 | I have excellent ideas....
   • LYRA     | O3 | r=0.46 | I have a vivid imagination....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A7
   Pending count: 31

======================================================================
📊 ADAPTIVE TESTING - Question #15 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 7 dimensions uncertain (avg uncertainty: 0.74)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE ORPHEUS  | Uncertainty: 0.42 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🔍 Injecting consistency-check question: APati8
   Replaced last item with consistency check: APati8

📋 Next Questions (3 items):
   • LYRA     | O8 | r=0.46 | I use difficult words....
   • LYRA     | O6 | r=0.45 | I do not have a good imagination....
   • CHRONOS  | APati8 | r=0.72 | Small things can annoy me pretty quickly....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A5
   Pending count: 33

======================================================================
📊 ADAPTIVE TESTING - Question #16 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.73)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.32 | Items: 4 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • LYRA     | O4 | r=0.44 | I am not interested in abstract ideas....
   • LYRA     | O7 | r=0.43 | I am quick to understand things....
   • LYRA     | LYRA_SC1 | r=0.66 | You have a ferocious appetite for books and spend ...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A8
   Pending count: 35

======================================================================
📊 ADAPTIVE TESTING - Question #17 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.71)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.20 | Items: 5 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • LYRA     | LYRA_SC2 | r=0.63 | You're drawn to colorful packaging and visual sati...
   • LYRA     | LYRA_SC3 | r=0.60 | You love charts, diagrams, and graphs because you ...
   • LYRA     | LYRA_SC4 | r=0.62 | You prefer getting your news from TV rather than m...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A2
   Pending count: 37

======================================================================
📊 ADAPTIVE TESTING - Question #18 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.25 | Items: 6 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | HMode5 | r=0.64 | I would like to have more power than other people....
   • VARA     | HFair7 | r=0.58 | I cheat to get ahead....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A6
   Pending count: 39

======================================================================
📊 ADAPTIVE TESTING - Question #19 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 7 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • VARA     | HGree10 | r=0.58 | I am out for my own personal gain....
   • VARA     | HGree5 | r=0.57 | I seek status....
   • VARA     | HMode6 | r=0.57 | I believe that I am better than others....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A10
   Pending count: 41

======================================================================
📊 ADAPTIVE TESTING - Question #20 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.29 | Items: 8 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 100.0%
   Attention Score: 100.0%

📋 Next Questions (3 items):
   • VARA     | HSinc3 | r=0.55 | I tell other people what they want to hear so that...
   • VARA     | HSinc2 | r=0.52 | I use flattery to get ahead....
   • VARA     | HSinc4 | r=0.52 | I put on a show to impress people....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: A1
   Pending count: 43

======================================================================
📊 ADAPTIVE TESTING - Question #21 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.26 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • VARA     | HFair10 | r=0.50 | I would not regret my behavior if I were to take a...
   • VARA     | HMode9 | r=0.50 | I am likely to show off if I get the chance....
   • VARA     | HFair1 | r=0.48 | I would never take things that aren't mine....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORPHEUS_SC1
   Pending count: 45

======================================================================
📊 ADAPTIVE TESTING - Question #22 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.25 | Items: 10 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • VARA     | HSinc6 | r=0.48 | I play a role in order to impress people....
   • VARA     | HFair8 | r=0.47 | I steal things....
   • VARA     | HGree6 | r=0.46 | I am mainly interested in money....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORPHEUS_SC2
   Pending count: 47

======================================================================
📊 ADAPTIVE TESTING - Question #23 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.26 | Items: 11 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • VARA     | HSinc5 | r=0.46 | I switch my loyalties when I feel like it....
   • VARA     | HMode1 | r=0.46 | I don't think that I'm better than other people....
   • VARA     | HFair4 | r=0.45 | I would feel very badly for a long time if I were ...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORPHEUS_SC3
   Pending count: 49

======================================================================
📊 ADAPTIVE TESTING - Question #24 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 12 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • VARA     | VARA_SC2 | r=0.61 | You never start speaking until you've thought out ...
   • VARA     | VARA_SC3 | r=0.59 | When you order at a restaurant, it takes you a lon...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORPHEUS_SC4
   Pending count: 51

======================================================================
📊 ADAPTIVE TESTING - Question #25 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.72)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • VARA     | VARA_SC4 | r=0.60 | In your grocery cart, visual appeal matters more t...
   • CHRONOS  | APati2 | r=0.70 | I rarely feel angry with people....
   • CHRONOS  | APati1 | r=0.65 | I find that it takes a lot to make me feel angry a...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C5
   Pending count: 53

======================================================================
📊 ADAPTIVE TESTING - Question #26 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 0.24 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • CHRONOS  | AForg5 | r=0.63 | I find it hard to forgive others....
   • CHRONOS  | APati5 | r=0.63 | I seldom get mad....
   • CHRONOS  | APati4 | r=0.62 | I rarely get irritated....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C6
   Pending count: 55

======================================================================
📊 ADAPTIVE TESTING - Question #27 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.66)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 0.53 | Items: 2 | Recommended: +2
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • CHRONOS  | APati9 | r=0.62 | I lose my temper....
   • CHRONOS  | AForg6 | r=0.60 | I hold a grudge....
   • CHRONOS  | AForg3 | r=0.58 | I am inclined to forgive others....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C4
   Pending count: 57

======================================================================
📊 ADAPTIVE TESTING - Question #28 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 6 dimensions uncertain (avg uncertainty: 0.64)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE ORIN     | Uncertainty: 0.32 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • CHRONOS  | AFlex7 | r=0.55 | I am annoyed by others' mistakes....
   • CHRONOS  | AGent8 | r=0.54 | I speak ill of others....
   • CHRONOS  | APati3 | r=0.53 | I am usually a patient person....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C1
   Pending count: 59

======================================================================
📊 ADAPTIVE TESTING - Question #29 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.64)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.32 | Items: 4 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • CHRONOS  | AGent5 | r=0.53 | I become frustrated and angry with people when the...
   • CHRONOS  | AGent6 | r=0.52 | I am quick to judge others....
   • CHRONOS  | AForg2 | r=0.52 | I try to forgive and forget....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C9
   Pending count: 61

======================================================================
📊 ADAPTIVE TESTING - Question #30 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.29 | Items: 5 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 100.0%
   Attention Score: 100.0%

📋 Next Questions (3 items):
   • CHRONOS  | AGent10 | r=0.51 | I criticize others' shortcomings....
   • CHRONOS  | CHRONOS_SC1 | r=0.65 | You're the slowest eater among your friends and ar...
   • CHRONOS  | CHRONOS_SC2 | r=0.62 | You're the last one to leave an intersection and r...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C2
   Pending count: 63

======================================================================
📊 ADAPTIVE TESTING - Question #31 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.25 | Items: 6 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • CHRONOS  | CHRONOS_SC3 | r=0.64 | Late on Saturday morning, you can still be found s...
   • CHRONOS  | CHRONOS_SC4 | r=0.63 | When you hate a task, you do it with vengeance at ...
   • CHRONOS  | CHRONOS_SC5 | r=0.60 | You work best under pressure, though you claim you...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C8
   Pending count: 65

======================================================================
📊 ADAPTIVE TESTING - Question #32 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 7 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
   • KAEL     | D5 | r=0.58 | I have a strong personality....
   • KAEL     | D7 | r=0.56 | I would be afraid to give a speech in public....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C7
   Pending count: 67

======================================================================
📊 ADAPTIVE TESTING - Question #33 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.25 | Items: 8 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • KAEL     | D2 | r=0.49 | I'm comfortable when everyone's eyes are on me....
   • KAEL     | D9 | r=0.47 | I hate being the center of attention....
   • KAEL     | D3 | r=0.42 | I'm at ease when I'm with other people....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C10
   Pending count: 69

======================================================================
📊 ADAPTIVE TESTING - Question #34 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.26 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • KAEL     | D4 | r=0.42 | I have leadership abilities....
   • KAEL     | D6 | r=0.41 | I know how to captivate people....
   • KAEL     | D10 | r=0.39 | I don't contribute much to conversations....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: C3
   Pending count: 71

======================================================================
📊 ADAPTIVE TESTING - Question #35 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.28 | Items: 10 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | KAEL_SC2 | r=0.65 | You bolt down food in big chunks, often talking wh...
   • KAEL     | KAEL_SC3 | r=0.63 | You're a debater who gets right to the point and i...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORIN_SC1
   Pending count: 73
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #36 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 11 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (3 items):
   • KAEL     | KAEL_SC4 | r=0.64 | When shopping, you want to purchase what you need ...
   • KAEL     | KAEL_SC5 | r=0.61 | Before making decisions, you carefully avoid any u...
   • LUMEN    | E5 | r=0.71 | I start conversations....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORIN_SC2
   Pending count: 75
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #37 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.26 | Items: 12 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (2 items):
   • LUMEN    | E7 | r=0.70 | I talk to a lot of different people at parties....
   • LUMEN    | E4 | r=0.68 | I keep in the background....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORIN_SC3
   Pending count: 76
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #38 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.25 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (2 items):
   • LUMEN    | E3 | r=0.65 | I feel comfortable around people....
   • LUMEN    | E2 | r=0.65 | I tend to be quiet in most situations....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORIN_SC4
   Pending count: 77
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #39 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.26 | Items: 14 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (2 items):
   • LUMEN    | E10 | r=0.64 | I am quiet around strangers....
   • LUMEN    | E1 | r=0.63 | I am the life of the party....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: ORIN_SC5
   Pending count: 78
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #40 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.63)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 75.0%
   Attention Score: 100.0%
   ✅ Being prepared/organized: 75% consistent

🔍 Injecting consistency-check question: XExpr3
   Replaced last item with consistency check: XExpr3

📋 Next Questions (2 items):
   • LUMEN    | XExpr10 | r=0.58 | I speak softly....
   • LUMEN    | XExpr3 | r=0.54 | I'm usually the most energetic person in the room ...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O10
   Pending count: 79
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #41 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.58)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 0.59 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (2 items):
   • LUMEN    | E9 | r=0.58 | I don't mind being the center of attention....
   • LUMEN    | E6 | r=0.57 | I have little to say....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O1
   Pending count: 80
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #42 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.57)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 0.53 | Items: 2 | Recommended: +2
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (2 items):
   • LUMEN    | XExpr7 | r=0.53 | I don't like to draw attention to myself....
   • LUMEN    | E8 | r=0.52 | I prefer to stay in the background rather than be ...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O2
   Pending count: 81
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #43 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 5 dimensions uncertain (avg uncertainty: 0.56)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   🔴 NEEDS MORE LYRA     | Uncertainty: 0.47 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (2 items):
   • LUMEN    | LUMEN_SC1 | r=0.72 | At a restaurant, you're enjoying the conversation ...
   • LUMEN    | LUMEN_SC2 | r=0.68 | When driving, you find yourself wanting to look at...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O5
   Pending count: 82
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #44 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.56)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.41 | Items: 4 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (2 items):
   • LUMEN    | LUMEN_SC3 | r=0.65 | You start yard work with great enthusiasm, but wit...
   • LUMEN    | LUMEN_SC4 | r=0.70 | In social situations, you rarely thrust yourself i...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O3
   Pending count: 83
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #45 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.54)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.29 | Items: 5 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

📋 Next Questions (1 items):
   • LUMEN    | LUMEN_SC5 | r=0.66 | Your speech is overly expressive and you use exagg...
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O8
   Pending count: 83
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #46 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.53)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.23 | Items: 6 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 3 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, CHRONOS, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   Added 2 fresh emergency items for CHRONOS
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 6 emergency questions
   These items are safe from demographic filtering
   Cleared 6 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (6 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • CHRONOS  | APati7 | r=0.73 | I get angry easily....
   • CHRONOS  | APati6 | r=0.72 | I am easily annoyed....
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O6
   Pending count: 84
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #47 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.53)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.18 | Items: 7 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, CHRONOS, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for CHRONOS to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 6 emergency questions
   These items are safe from demographic filtering
   Cleared 6 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (6 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • CHRONOS  | APati7 | r=0.73 | I get angry easily....
   • CHRONOS  | APati6 | r=0.72 | I am easily annoyed....
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:37830 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: APati8
   Pending count: 83
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #48 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.44)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.18 | Items: 7 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 4 emergency questions
   These items are safe from demographic filtering
   Cleared 4 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (4 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O4
   Pending count: 82
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #49 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.44)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.17 | Items: 8 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 4 emergency questions
   These items are safe from demographic filtering
   Cleared 4 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (4 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: O7
   Pending count: 81
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #50 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.44)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.20 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 87.5%
   Attention Score: 100.0%
   ✅ Gets irritated easily: 100% consistent
   ✅ Being prepared/organized: 75% consistent

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 4 emergency questions
   These items are safe from demographic filtering
   Cleared 4 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (4 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: LYRA_SC1
   Pending count: 80
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #51 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.44)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.22 | Items: 10 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 4 emergency questions
   These items are safe from demographic filtering
   Cleared 4 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (4 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: LYRA_SC2
   Pending count: 79
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #52 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.44)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.20 | Items: 11 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 4 emergency questions
   These items are safe from demographic filtering
   Cleared 4 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (4 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: LYRA_SC3
   Pending count: 78
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #53 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.44)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.18 | Items: 12 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 4 emergency questions
   These items are safe from demographic filtering
   Cleared 4 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (4 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: LYRA_SC4
   Pending count: 77
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #54 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.44)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 1.00 | Items: 0 | Recommended: +4
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: VARA, KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for VARA to FRONT of queue
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 4 emergency questions
   These items are safe from demographic filtering
   Cleared 4 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (4 items):
   • VARA     | HGree4 | r=0.64 | I have a strong need for power....
   • VARA     | VARA_SC1 | r=0.64 | You compare prices and quality quite carefully whe...
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HGree4
   Pending count: 76
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #55 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.39)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 0.59 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HMode5
   Pending count: 75
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #56 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.36)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 0.37 | Items: 2 | Recommended: +2
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HFair7
   Pending count: 74
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #57 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 4 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE VARA     | Uncertainty: 0.21 | Items: 3 | Recommended: +2
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HGree10
   Pending count: 73
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #58 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.20 | Items: 4 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HGree5
   Pending count: 72
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #59 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.19 | Items: 5 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HMode6
   Pending count: 71
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #60 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.33)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.14 | Items: 6 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 87.5%
   Attention Score: 100.0%
   ✅ Gets irritated easily: 100% consistent
   ✅ Being prepared/organized: 75% consistent

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HSinc3
   Pending count: 70
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #61 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.17 | Items: 7 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HSinc2
   Pending count: 69
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #62 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.20 | Items: 8 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HSinc4
   Pending count: 68
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #63 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.22 | Items: 9 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HFair10
   Pending count: 67
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #64 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.19 | Items: 10 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HMode9
   Pending count: 66
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #65 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.20 | Items: 11 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HFair1
   Pending count: 65
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #66 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.22 | Items: 12 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HSinc6
   Pending count: 64
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #67 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HFair8
   Pending count: 63
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #68 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.18 | Items: 14 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HGree6
   Pending count: 62
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #69 answered
======================================================================

🤔 Decision: CONTINUE
   Reason: 3 dimensions uncertain (avg uncertainty: 0.34)

📈 Dimension Analysis:
   🔴 NEEDS MORE LUMEN    | Uncertainty: 0.39 | Items: 3 | Recommended: +2
   ✅ CONFIDENT AETHER   | Uncertainty: 0.10 | Items: 9 | Recommended: +0
   ✅ CONFIDENT ORPHEUS  | Uncertainty: 0.27 | Items: 13 | Recommended: +0
   ✅ CONFIDENT ORIN     | Uncertainty: 0.27 | Items: 15 | Recommended: +0
   ✅ CONFIDENT LYRA     | Uncertainty: 0.19 | Items: 13 | Recommended: +0
   ✅ CONFIDENT VARA     | Uncertainty: 0.20 | Items: 15 | Recommended: +0
   🔴 NEEDS MORE CHRONOS  | Uncertainty: 0.30 | Items: 1 | Recommended: +2
   🔴 NEEDS MORE KAEL     | Uncertainty: 1.00 | Items: 0 | Recommended: +4

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HSinc5
   Pending count: 61
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #70 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 87.5%
   Attention Score: 100.0%
   ✅ Gets irritated easily: 100% consistent
   ✅ Being prepared/organized: 75% consistent

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HMode1
   Pending count: 60
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #71 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: HFair4
   Pending count: 59
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #72 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: VARA_SC1
   Pending count: 58
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #73 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: VARA_SC2
   Pending count: 57
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #74 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: VARA_SC3
   Pending count: 56
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #75 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: VARA_SC4
   Pending count: 55
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #76 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: APati2
   Pending count: 54
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #77 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: APati1
   Pending count: 53
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #78 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AForg5
   Pending count: 52
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #79 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: APati5
   Pending count: 51
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #80 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 87.5%
   Attention Score: 100.0%
   ✅ Gets irritated easily: 100% consistent
   ✅ Being prepared/organized: 75% consistent

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: APati4
   Pending count: 50
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #81 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: APati9
   Pending count: 49
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #82 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AForg6
   Pending count: 48
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #83 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AForg3
   Pending count: 47
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #84 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AFlex7
   Pending count: 46
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #85 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AGent8
   Pending count: 45
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #86 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: APati3
   Pending count: 44
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #87 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AGent5
   Pending count: 43
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #88 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AGent6
   Pending count: 42
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #89 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AForg2
   Pending count: 41
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #90 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🎯 Response Validation Check:
   Consistency Score: 87.5%
   Attention Score: 100.0%
   ✅ Gets irritated easily: 100% consistent
   ✅ Being prepared/organized: 75% consistent

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: AGent10
   Pending count: 40
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #91 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: CHRONOS_SC1
   Pending count: 39
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #92 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:33724 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: CHRONOS_SC2
   Pending count: 38
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #93 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:54346 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: CHRONOS_SC3
   Pending count: 37
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #94 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:54350 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: CHRONOS_SC4
   Pending count: 36
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #95 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:38788 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: CHRONOS_SC5
   Pending count: 35
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #96 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   Forcing continuation to collect minimum data...

🔍 Demographics for filtering: {'demo_name': 'Christopher Edeson', 'demo_age': 25, 'demo_gender': 'male', 'demo_country': 'Afghanistan', 'demo_drives': 'yes', 'demo_credit_cards': 'yes', 'demo_has_yard': 'yes'}

🌍 Context-Aware Filtering:
   Excluded 2 culturally-irrelevant items

🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!
   Dimensions with 0 items: KAEL
   This indicates context filtering removed too many questions.
   Forcing inclusion of minimum items for each dimension...
   ⚠️  Promoted 2 pending items for KAEL to FRONT of queue
   ✅ Recovered 2 emergency questions
   These items are safe from demographic filtering
   Cleared 2 items from pending queue
   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed

📋 Next Questions (2 items):
   • KAEL     | KAEL_SC1 | r=0.67 | You're a daring driver who darts in and out of tra...
   • KAEL     | D1 | r=0.65 | I am good at making impromptu speeches....
======================================================================

INFO:     127.0.0.1:38798 - "POST /api/assessment/answer HTTP/1.1" 200 OK

🔍 DEBUG - Session 4.804526
   Question: D1
   Pending count: 34
   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!

======================================================================
📊 ADAPTIVE TESTING - Question #97 answered
======================================================================

🤔 Decision: STOP
   Reason: Maximum items reached (70)

✅ Assessment Complete! Total items: 97
======================================================================

INFO:     127.0.0.1:38798 - "POST /api/assessment/answer HTTP/1.1" 200 OK

✅ Generated integrated narrative with OpenAI
   Cost: $0.0019
   Model: gpt-5-nano

📊 Final Validation Results:
   Consistency: 87.5%
   Attention: 100.0%
   Back Navigation: 0 times
INFO:     127.0.0.1:38798 - "GET /api/assessment/session_1762500364.804526/results HTTP/1.1" 200 OK






