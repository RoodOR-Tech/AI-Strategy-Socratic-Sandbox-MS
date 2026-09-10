<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>AI Strategy Socratic Sandbox</title>
<style>
:root{
  --ink:#182330;
  --muted:#5b6879;
  --line:#d7dfe8;
  --paper:#fff;
  --soft:#f4f7fa;
  --blue:#255a9b;
  --navy:#102b48;
  --teal:#136a66;
  --gold:#986b17;
  --green:#2d724f;
  --shadow:0 16px 42px rgba(28,41,55,.11);
  --shadow2:0 24px 64px rgba(20,35,52,.18);
}
*{box-sizing:border-box}
body{
  margin:0;min-height:100vh;
  font-family:Arial,Helvetica,sans-serif;color:var(--ink);
  background:
    linear-gradient(90deg,rgba(37,90,155,.06) 1px,transparent 1px),
    linear-gradient(180deg,rgba(22,124,120,.05) 1px,transparent 1px),
    linear-gradient(135deg,#eaf1f6 0%,#f9fbfd 46%,#eef4f2 100%);
  background-size:42px 42px,42px 42px,auto;
}
button,textarea,input{font:inherit}
button{border:0;cursor:pointer;background:none;color:inherit}
:focus-visible{outline:3px solid var(--navy);outline-offset:2px}
.vh{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.skip-link{position:absolute;left:8px;top:-64px;z-index:40;background:var(--navy);color:#fff;font-weight:700;padding:10px 14px;border-radius:0 0 6px 6px;text-decoration:none;transition:top .15s ease}
.skip-link:focus{top:0}
.shell{min-height:100vh;display:grid;grid-template-rows:auto 1fr auto}
header{position:sticky;top:0;z-index:10;display:grid;grid-template-columns:minmax(240px,1fr) auto;gap:18px;align-items:end;padding:20px clamp(16px,3vw,38px);background:rgba(255,255,255,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}
.brand-row{display:flex;align-items:center;gap:12px}
.brand-mark{width:42px;height:42px;border-radius:8px;display:grid;place-items:center;background:linear-gradient(135deg,var(--navy),var(--teal));color:#fff;font-weight:900;box-shadow:0 12px 30px rgba(16,43,72,.22);flex:0 0 auto}
h1{margin:0;font-size:clamp(1.55rem,2.6vw,2.45rem);line-height:1.06;color:var(--navy)}
.tagline{margin:7px 0 0;max-width:820px;color:var(--muted);line-height:1.45}
.top-actions,.timer,.draft-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.btn{min-height:44px;border-radius:6px;padding:9px 13px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--blue);color:#fff;font-weight:700;transition:transform .16s ease,box-shadow .16s ease}
.btn:hover{transform:translateY(-1px);box-shadow:0 10px 24px rgba(37,90,155,.18)}
.btn.secondary{background:#e8eef5;color:#18395f}
.btn.ghost{background:#fff;color:#18395f;border:1px solid #b6c2cf}
.btn.danger{background:#8f2f22}
main{width:min(1480px,100%);margin:0 auto;padding:18px clamp(12px,2vw,28px) 28px;display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.45fr);gap:18px}
.workspace,.draft{background:var(--paper);border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow);overflow:hidden;min-width:0}
.phase-tabs{display:grid;grid-template-columns:repeat(10,minmax(44px,1fr));gap:1px;background:var(--line);border-bottom:1px solid var(--line)}
.phase-tab{min-height:58px;background:#f9fbfd;color:#23394f;padding:8px 5px;display:grid;place-items:center;gap:2px;text-align:center;position:relative}
.phase-tab:after{content:"";position:absolute;left:50%;bottom:6px;width:6px;height:6px;border-radius:50%;transform:translateX(-50%);background:transparent}
.phase-tab[data-captured=true]:after{background:var(--green)}
.phase-tab strong{font-size:.96rem}
.phase-tab span{color:var(--muted);font-size:.72rem;line-height:1.05}
.phase-tab[aria-selected=true]{background:var(--blue);color:#fff}
.phase-tab[aria-selected=true]:after{background:#fff}
.phase-tab[aria-selected=true] span{color:rgba(255,255,255,.94)}
.phase-tab:focus-visible{outline-offset:-3px;outline-color:#fff;box-shadow:inset 0 0 0 6px var(--navy)}
.phase-tab:not([aria-selected=true]):focus-visible{outline-color:var(--navy);box-shadow:none}
.phase{padding:clamp(18px,2.5vw,28px);display:grid;gap:18px}
.phase-head{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:start}
.kicker{margin:0 0 5px;color:var(--teal);font-size:.8rem;font-weight:800;text-transform:uppercase}
h2{margin:0;font-size:clamp(1.35rem,2vw,2rem);line-height:1.14}
h2:focus-visible{outline-offset:4px}
.copy{margin:8px 0 0;color:var(--muted);line-height:1.47;max-width:820px}
.pill{display:inline-flex;align-items:center;justify-content:center;min-height:30px;border-radius:999px;padding:5px 10px;background:#e9f5f3;color:#0e5450;font-size:.78rem;font-weight:800;white-space:nowrap}
.phase-tools{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:12px;border:1px solid var(--line);border-radius:8px;background:linear-gradient(135deg,#f8fbfd,#fff)}
.progress-wrap{display:grid;gap:7px}
.progress-top{display:flex;justify-content:space-between;gap:12px;color:var(--muted);font-size:.8rem;font-weight:700}
.progress-track{height:10px;border-radius:999px;background:#e6edf4;overflow:hidden}
.progress-bar{width:0%;height:100%;background:linear-gradient(90deg,var(--teal),var(--blue));border-radius:inherit;transition:width .28s ease}
.timer-readout{min-width:64px;text-align:center;border:1px solid #b6c2cf;border-radius:6px;background:#fff;padding:9px 10px;font-weight:900;color:var(--navy)}
.grid{display:grid;grid-template-columns:minmax(0,.7fr) minmax(320px,.55fr);gap:16px;align-items:start}
.card{border:1px solid var(--line);border-radius:8px;background:#fff;overflow:hidden;box-shadow:0 8px 24px rgba(28,41,55,.06)}
.card-head{padding:13px 15px;border-bottom:1px solid var(--line);background:#f8fafc;display:flex;align-items:center;justify-content:space-between;gap:12px}
.card-head h3{margin:0;font-size:.96rem}
.card-body{padding:15px;display:grid;gap:13px}
label{display:grid;gap:7px;color:#263545;font-weight:700;font-size:.88rem}
textarea,input[type=text]{width:100%;border:1px solid #8d9aa8;border-radius:6px;padding:10px 11px;min-height:44px;color:var(--ink);background:#fff;line-height:1.45;font-weight:400}
textarea:focus-visible,input:focus-visible{outline:3px solid var(--blue);outline-offset:1px;border-color:var(--blue)}
textarea{resize:vertical;min-height:116px}
::placeholder{color:#5b6879;opacity:1}
.prompt{border:1px solid #c6d0da;border-radius:8px;padding:13px;background:linear-gradient(180deg,rgba(37,90,155,.05),transparent 68%),#fbfcfe;white-space:pre-wrap;line-height:1.44;color:#25384b;min-height:154px}
.media-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}
.media{border:1px solid var(--line);border-radius:8px;background:linear-gradient(180deg,#fff,var(--soft));min-height:108px;padding:12px;display:grid;align-content:start;gap:8px}
.media b{display:flex;align-items:center;gap:7px;color:#17375f;font-size:.9rem}
.media span{color:var(--muted);font-size:.82rem;line-height:1.34}
.icon{width:26px;height:26px;display:inline-grid;place-items:center;border-radius:50%;background:#dfeaf5;color:#17375f;font-weight:900;font-size:.82rem;flex:0 0 auto}
.discussion{border-left:4px solid var(--gold);background:#fff9ea;padding:12px;line-height:1.43;color:#4d3a13}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{min-height:36px;border-radius:999px;padding:7px 10px;display:inline-flex;align-items:center;gap:6px;background:#edf3f9;color:#25384b;font-weight:700;font-size:.82rem;border:1px solid #b9c6d3}
.facilitator-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}
.mini-stat{border:1px solid var(--line);border-radius:8px;background:#fff;padding:11px}
.mini-stat b{display:block;color:var(--navy);font-size:.86rem;margin-bottom:3px}
.ai-notes{min-height:92px;background:#fffdf8;border-color:#8d9aa8}
.draft{position:sticky;top:96px;max-height:calc(100vh - 116px);display:grid;grid-template-rows:auto 1fr auto}
.draft-head{padding:17px;border-bottom:1px solid var(--line);background:#f8fafc}
.draft-head h2{font-size:1.08rem}
.draft-head p{margin:5px 0 0;color:var(--muted);font-size:.9rem;line-height:1.38}
.draft-scroll{overflow:auto;padding:14px;display:grid;gap:11px;align-content:start}
.draft-section{border:1px solid var(--line);border-radius:8px;padding:12px;background:#fff}
.draft-section.current{border-color:rgba(37,90,155,.55);background:#f8fbff}
.draft-section h3{margin:0 0 7px;font-size:.94rem;color:#17375f}
.draft-section p{margin:0;color:#2b3b4b;font-size:.9rem;line-height:1.42}
.draft-actions{padding:13px;border-top:1px solid var(--line);background:#f8fafc}
.small{color:var(--muted);font-size:.8rem;line-height:1.35;font-weight:400}
footer{padding:14px clamp(16px,3vw,38px);border-top:1px solid var(--line);background:rgba(255,255,255,.9);color:var(--muted);font-size:.85rem;line-height:1.4}
.toast{position:fixed;right:18px;bottom:18px;z-index:30;min-width:180px;border-radius:8px;background:var(--navy);color:#fff;padding:11px 13px;box-shadow:var(--shadow2);opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .18s ease,transform .18s ease;font-weight:700}
.toast.show{opacity:1;transform:translateY(0)}
dialog{border:1px solid var(--line);border-radius:10px;box-shadow:var(--shadow2);padding:22px;max-width:26rem;width:calc(100% - 32px);color:var(--ink)}
dialog::backdrop{background:rgba(16,43,72,.55)}
dialog h2{font-size:1.15rem;margin:0 0 8px}
dialog p{margin:0 0 16px;line-height:1.45;color:#2b3b4b}
dialog form{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
.noscript-warning{margin:20px auto;max-width:720px;background:#fff;border:1px solid var(--line);border-left:6px solid var(--gold);border-radius:8px;padding:18px;line-height:1.5}
body.focus-mode main{grid-template-columns:1fr}
body.focus-mode .draft{display:none}
body.focus-mode .workspace{box-shadow:var(--shadow2)}
@media(max-width:1060px){
  main,.grid{grid-template-columns:1fr}
  .draft{position:static;max-height:none}
}
@media(max-width:720px){
  header{grid-template-columns:1fr}
  .top-actions{justify-content:flex-start}
  .phase-tabs{display:flex;overflow-x:auto}
  .phase-tab{min-width:76px}
  .phase-head,.media-grid,.phase-tools,.facilitator-strip{grid-template-columns:1fr}
  .timer{justify-content:flex-start}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{transition:none!important;animation:none!important}
  .btn:hover,.media:hover{transform:none}
  html{scroll-behavior:auto}
}
</style>
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
<div class="shell">
<header>
  <div>
    <div class="brand-row">
      <div class="brand-mark" aria-hidden="true">AI</div>
      <h1>AI Strategy Socratic Sandbox</h1>
    </div>
    <p class="tagline">A mixed-media workshop page. The room uses its own AI tools, then captures the group consensus that becomes the strategy draft.</p>
  </div>
  <div class="top-actions">
    <button class="btn ghost" id="prevTopBtn" type="button">Previous phase</button>
    <button class="btn ghost" id="nextTopBtn" type="button">Next phase</button>
    <button class="btn secondary" id="focusBtn" type="button">Focus Mode</button>
    <button class="btn secondary" id="resetBtn" type="button">Reset</button>
    <button class="btn" id="exportTopBtn" type="button">Export Word</button>
  </div>
</header>

<main id="main" tabindex="-1">
<noscript>
  <div class="noscript-warning">
    <strong>This workshop page needs JavaScript to run.</strong>
    <p>Your browser or this SharePoint site is blocking scripts. If you opened this file from a SharePoint document library and see this message, ask your site administrator to enable custom script for the site, or host the page on an approved static-hosting service instead.</p>
  </div>
</noscript>

<section class="workspace" aria-label="Socratic workspace">
  <div class="phase-tabs" id="phaseTabs" role="tablist" aria-label="Workshop phases"></div>
  <div class="phase" id="phasePanel" role="tabpanel" aria-labelledby="tab-1">
    <div class="phase-head">
      <div>
        <p class="kicker" id="phaseKicker"></p>
        <h2 id="phaseTitle" tabindex="-1"></h2>
        <p class="copy" id="phaseCopy"></p>
      </div>
      <span class="pill" id="phasePill" aria-live="polite">Not captured</span>
    </div>
    <div class="phase-tools">
      <div class="progress-wrap">
        <div class="progress-top">
          <span id="phaseProgressLabel">Workshop progress</span>
          <span id="saveStatus" aria-live="polite">Autosaved</span>
        </div>
        <div class="progress-track" aria-hidden="true"><div class="progress-bar" id="progressBar"></div></div>
      </div>
      <div class="timer">
        <button class="btn ghost" id="prevBtn" type="button">Previous</button>
        <button class="btn secondary" id="timerBtn" type="button">Start 8:00 timer</button>
        <span class="timer-readout" id="timerReadout" role="timer" aria-label="Time remaining">08:00</span>
        <button class="btn ghost" id="nextBtn" type="button">Next</button>
      </div>
    </div>
    <ul class="facilitator-strip">
      <li class="mini-stat"><b>Huddle</b><span class="small">Add local context before copying the prompt.</span></li>
      <li class="mini-stat"><b>Interrogate</b><span class="small">Use any AI tool and bring back the useful friction.</span></li>
      <li class="mini-stat"><b>Consensus</b><span class="small">Only the final group decision enters the draft.</span></li>
    </ul>
    <div class="grid">
      <div class="card">
        <div class="card-head"><h3>Step 1: Group Huddle</h3><span class="small" id="huddleHint"></span></div>
        <div class="card-body">
          <div class="discussion" id="discussionQuestion"></div>
          <label for="contextInput"><span id="contextLabelText">Local context</span></label>
          <textarea id="contextInput" aria-describedby="contextHint"></textarea>
          <p class="small" id="contextHint"></p>
          <ul class="media-grid" id="mediaGrid"></ul>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Step 2: Ask Your AI</h3><button class="btn secondary" id="copyPromptBtn" type="button">Copy Prompt</button></div>
        <div class="card-body">
          <div class="prompt" id="promptText"></div>
          <p class="small">Paste this prompt into whatever AI tool participants are already using. Bring the AI response back to the group for debate.</p>
          <label for="notesInput">AI response scratchpad</label>
          <textarea class="ai-notes" id="notesInput" aria-describedby="notesHint"></textarea>
          <p class="small" id="notesHint">Optional: paste useful AI questions, risks, or phrases here. This will not export unless you move it into consensus.</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3>Step 3: Consensus Capture</h3><span class="small">This text feeds the final draft</span></div>
      <div class="card-body">
        <label for="consensusInput">What did the group decide after discussing the AI response?</label>
        <textarea id="consensusInput"></textarea>
        <div class="chips" id="starterChips" role="group" aria-label="Starter phrases — insert into consensus notes"></div>
      </div>
    </div>
  </div>
</section>

<aside class="draft" aria-label="Strategy draft">
  <div class="draft-head">
    <h2>Strategy Capture</h2>
    <p id="progressText" aria-live="polite">0 of 10 sections captured.</p>
    <div class="progress-track" aria-hidden="true"><div class="progress-bar" id="sideProgressBar"></div></div>
  </div>
  <div class="draft-scroll" id="draftScroll" role="region" aria-label="Captured draft sections" tabindex="0"></div>
  <div class="draft-actions">
    <button class="btn" id="exportWordBtn" type="button">Export Word</button>
    <button class="btn secondary" id="copyDraftBtn" type="button">Copy Draft</button>
  </div>
</aside>
</main>

<footer>
  Notes are stored only in this browser on this device (local storage). Nothing is sent over the network. Use Reset to clear all notes — for example, before leaving a shared or kiosk computer.
</footer>
</div>

<dialog id="resetDialog" aria-labelledby="resetDialogTitle">
  <h2 id="resetDialogTitle">Reset all workshop notes?</h2>
  <p>This permanently clears every phase's context, scratchpad, and consensus notes stored in this browser. This cannot be undone.</p>
  <form method="dialog">
    <button class="btn secondary" value="cancel" type="submit">Cancel</button>
    <button class="btn danger" value="confirm" type="submit">Reset all notes</button>
  </form>
</dialog>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script>
'use strict';
var phases=[['Summary','Executive Summary','The Stress-Test Interview','Stress-test the agency problem AI should help solve before writing the strategic rationale.','What is the single biggest problem our agency hopes AI will solve this year?','Problem statement','Example: Reduce staff time spent summarizing high-volume public comments while preserving accuracy and public trust.',function(c){return 'We are a state agency considering adopting AI to solve this problem: "'+c+'". Act as a cynical technology auditor. Ask us 3 hard, critical questions about potential public backlash, hidden operational costs, or mission creep that we have not thought of yet.'},[['Q','Hard Questions','Read the AI questions aloud before answering them.'],['M','Mission Lens','Tie every answer back to public value.'],['B','Boundary','Name at least one thing AI will not do.']],['Public value','Mission fit','Clear boundaries']],
['Principles','Guiding Principles for Responsible AI Use','The Ethical Dilemma Simulator','Use a fictional dilemma to turn values into practical boundary rules.','Which top 3 principles should guide staff judgment when rules are not enough?','Top 3 principles','Example: Equity, transparency, accountability.',function(c){return 'We want our core AI principles to be "'+c+'". Create a brief, fictional ethical dilemma or worst-case scenario specific to a state government setting where these principles would conflict or be tested. How should our staff navigate it?'},[['V','Values','Choose principles the agency can operationalize.'],['S','Scenario','Ask whether the dilemma feels realistic.'],['R','Rule','Translate values into rules of thumb.']],['Decision rules','Conflict handling','Employee judgment']],
['Governance','Governance and Oversight','The Bottleneck Finder','Separate fast-track review from escalation so governance can handle real demand.','Who currently reviews new software or digital tools in our agency, and how long does it take?','Current review structure','Example: Program manager, IT security, data governance, privacy officer, IT governance committee.',function(c){return 'Here is our current agency software review structure: "'+c+'". If 15 different program managers suddenly submit requests for different AI tools next week, where will our bottleneck be? Propose an operational vs. strategic layer to handle this surge smoothly.'},[['F','Fast Lane','Define low-risk reviews that should move quickly.'],['E','Escalation','Name triggers for executive review.'],['O','Owner','Assign accountability for every use case.']],['Operational layer','Strategic layer','Escalation path']],
['Intake','Use Case Intake and Evaluation Process','The Borderline Case','Use a gray-area scenario to decide what the AI Use Form must ask.','What is a plausible gray-area AI use case for the agency?','Gray-area use case','Example: Drafting initial responses to public records requests.',function(c){return 'Evaluate this specific public sector use case: "'+c+'". Based on standard government risk frameworks, list the top 2 low-risk elements and the top 2 high-risk elements. What specific safeguard must be on the intake form for this?'},[['L','Low Risk','Identify what makes the use manageable.'],['H','High Risk','Identify what could harm people or trust.'],['I','Intake','Turn the safeguard into a required question.']],['Required intake question','Risk rating','Safeguard']],
['Data','Data Management and Classification','The Data Leak Audit','Trace what could happen if sensitive data enters an unmanaged AI tool.','What is the single most sensitive dataset our agency handles?','Sensitive dataset','Example: Constituent case records, benefits eligibility records, personnel files, investigation notes.',function(c){return 'We handle "'+c+'". If a well-meaning employee pastes a subset of this data into a standard commercial AI tool to summarize a trend, trace the exact path of where that data goes and what compliance or privacy laws may be triggered.'},[['D','Data Path','Follow the data from employee action to vendor systems.'],['C','Classification','Decide what data may never enter public tools.'],['S','Steward','Name who can approve exceptions.']],['Classification boundary','Data steward','No-go data']],
['Tools','Tool Adoption','The Shadow IT Map','Use realistic employee behavior to decide approved highways and prohibited tools.','What AI tools are staff likely already using on personal devices or free websites?','Likely shadow tools or behaviors','Example: Free chatbots for summarizing emails, browser extensions, image generators, meeting-note apps.',function(c){return 'Act as a state employee who is overwhelmed with administrative paperwork. Given these likely shadow AI behaviors or tools: "'+c+'", list 3 specific ways employees may be using free, unmanaged AI tools today without IT knowledge. What enterprise-approved alternative should we provide to intercept this safely?'},[['A','Approved Highway','Offer a safer path people will actually use.'],['P','Prohibited','Make risky behavior clear and memorable.'],['N','Nudge','Reduce shadow IT by meeting real workflow needs.']],['Approved tools','Prohibited uses','Employee need']],
['Training','Training and Employee Engagement Strategy','The Fear and Hype Barometer','Shape training around the actual emotion in the workforce.','What is the dominant staff feeling right now: fear, hype, confusion, or fatigue?','Staff sentiment','Example: Confusion about what is allowed, plus hype among early adopters.',function(c){return 'Our agency staff is currently experiencing this AI sentiment: "'+c+'". Suggest a 3-part training framework that addresses this emotional barrier while teaching practical limitations, safe data handling, and escalation paths.'},[['E','Emotion','Start where staff actually are.'],['T','Training','Make it role-specific and practical.'],['C','Capacity','Fit the roadmap to learning resources.']],['Role-specific training','Safe data handling','Escalation path']],
['HITL','Human Oversight and Accountability','The Hallucination Drill','Practice catching a realistic AI error before defining oversight standards.','What critical task should AI never do autonomously in our agency?','Core function or policy area','Example: Determining eligibility, issuing enforcement decisions, publishing official public guidance.',function(c){return 'Generate a highly realistic-looking but subtly flawed or incorrect paragraph of text that an AI might produce regarding "'+c+'". Now, write a 2-step verification protocol a human employee must follow to spot this exact type of error.'},[['D','Drill','Have the group spot the flaw before reading the answer.'],['V','Verify','Require source checks and accountable review.'],['S','Signoff','Define who signs before action.']],['Verification protocol','Signoff owner','No autonomous action']],
['Trust','Transparency and Public Trust','The Headline Test','Use the headline you want to avoid to shape plain-language disclosure.','Imagine a local newspaper finds out our agency uses AI. What headline do we want to avoid?','AI use case or headline risk','Example: Agency secretly uses AI to draft public-facing guidance without review.',function(c){return 'We are using AI to assist with this use case or headline risk: "'+c+'". Write two versions of a public disclosure notice for our website. Version A: dense legalese that breeds suspicion. Version B: plain, trustworthy public sector language. Explain why Version B builds better trust.'},[['H','Headline','Name the trust failure before writing disclosure.'],['P','Plain Language','Prefer direct, human wording.'],['F','Feedback','Tell people where to ask questions.']],['Disclosure trigger','Plain language','Feedback channel']],
['Metrics','Success Metrics and Evaluation','The Unintended Consequences Review','Balance efficiency metrics with compliance, quality, and trust indicators.','If we measure success only by time saved, what bad behavior might we encourage?','Efficiency-only risk','Example: Staff may skip review, over-automate sensitive work, or optimize speed over fairness.',function(c){return 'If a state agency evaluates its AI strategy solely on efficiency and speed, what risks are they ignoring? Use this concern as context: "'+c+'". Suggest 2 risk-monitoring or compliance-auditing metrics we should track alongside efficiency to keep the strategy balanced.'},[['S','Speed','Keep useful efficiency metrics.'],['R','Risk','Add monitoring and audit metrics.'],['L','Learning','Commit to regular strategy review.']],['Efficiency metric','Risk metric','Review cadence']]
].map(function(p,i){return {id:i+1,short:p[0],title:p[1],exercise:p[2],copy:p[3],discussion:p[4],label:p[5],placeholder:p[6],prompt:p[7],media:p[8],chips:p[9]}});

var STORAGE_KEY='ai-strategy-socratic-sandbox-v1:'+location.pathname;
var APP_NAME='AI Strategy Socratic Sandbox';
var current=1,timerSeconds=480,timerHandle=null,storageOk=true;

function $(id){return document.getElementById(id)}
var els={};
['phaseTabs','phasePanel','phaseKicker','phaseTitle','phaseCopy','phasePill','phaseProgressLabel','saveStatus','progressBar','sideProgressBar','timerBtn','timerReadout','huddleHint','discussionQuestion','contextLabelText','contextInput','contextHint','mediaGrid','promptText','notesInput','consensusInput','starterChips','progressText','draftScroll','toast','resetDialog','copyPromptBtn','copyDraftBtn','exportWordBtn','exportTopBtn','nextBtn','nextTopBtn','prevBtn','prevTopBtn','focusBtn','resetBtn'].forEach(function(id){els[id]=$(id)});

var reducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');

function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function setText(el,txt){if(el.textContent!==txt)el.textContent=txt}
function phase(){return phases.find(function(p){return p.id===current})}

function defaults(){var o={};phases.forEach(function(p){o[p.id]={context:'',consensus:'',notes:''}});return o}
function load(){
  var b=defaults();
  try{
    var s=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
    phases.forEach(function(p){b[p.id]=Object.assign(b[p.id],s[p.id]||{})});
  }catch(e){}
  return b;
}
var state=load();
function save(){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    flashSave();
  }catch(e){
    if(storageOk){storageOk=false;setText(els.saveStatus,'Autosave unavailable — copy or export your draft before closing')}
  }
  renderDraft();
}
function flashSave(){
  if(!storageOk)return;
  setText(els.saveStatus,'Saving…');
  clearTimeout(flashSave.t);
  flashSave.t=setTimeout(function(){setText(els.saveStatus,'Autosaved')},1200);
}

/* --- Tabs (APG tabs pattern: roving tabindex, arrow keys, selection follows focus) --- */
function buildTabs(){
  els.phaseTabs.innerHTML=phases.map(function(p){
    return '<button class="phase-tab" type="button" role="tab" id="tab-'+p.id+'" data-phase="'+p.id+'" aria-controls="phasePanel" aria-selected="false" tabindex="-1"><strong aria-hidden="true">'+p.id+'</strong><span aria-hidden="true">'+esc(p.short)+'</span></button>';
  }).join('');
  els.phaseTabs.querySelectorAll('[role=tab]').forEach(function(b){
    b.addEventListener('click',function(){setPhase(+b.dataset.phase)});
  });
  els.phaseTabs.addEventListener('keydown',function(e){
    var idx=current-1,n=phases.length;
    if(e.key==='ArrowRight')idx=(idx+1)%n;
    else if(e.key==='ArrowLeft')idx=(idx-1+n)%n;
    else if(e.key==='Home')idx=0;
    else if(e.key==='End')idx=n-1;
    else return;
    e.preventDefault();
    setPhase(idx+1,{focusTab:true});
  });
}
function updateTabs(){
  els.phaseTabs.querySelectorAll('[role=tab]').forEach(function(t){
    var id=+t.dataset.phase,selected=id===current,captured=!!state[id].consensus.trim();
    t.setAttribute('aria-selected',selected?'true':'false');
    t.tabIndex=selected?0:-1;
    t.dataset.captured=captured;
    var p=phases[id-1];
    t.setAttribute('aria-label','Phase '+p.id+': '+p.short+(captured?', captured':', not captured'));
  });
}

function render(){
  var p=phase(),s=state[current];
  updateTabs();
  els.phasePanel.setAttribute('aria-labelledby','tab-'+p.id);
  document.title='Phase '+p.id+': '+p.title+' — '+APP_NAME;
  setText(els.phaseKicker,'Phase '+p.id+' / '+p.exercise);
  setText(els.phaseTitle,p.title);
  setText(els.phaseCopy,p.copy);
  setText(els.phasePill,s.consensus.trim()?'Captured':'Not captured');
  setText(els.huddleHint,'Exercise: '+p.exercise);
  setText(els.discussionQuestion,p.discussion);
  setText(els.contextLabelText,p.label);
  setText(els.contextHint,p.placeholder);
  els.contextInput.value=s.context;
  els.promptText.textContent=p.prompt(s.context.trim()||'[Insert '+p.label+']');
  els.consensusInput.value=s.consensus;
  els.notesInput.value=s.notes||'';
  els.mediaGrid.innerHTML=p.media.map(function(x){
    return '<li class="media"><b><span class="icon" aria-hidden="true">'+esc(x[0])+'</span>'+esc(x[1])+'</b><span>'+esc(x[2])+'</span></li>';
  }).join('');
  els.starterChips.innerHTML=p.chips.map(function(c){
    return '<button class="chip" type="button" data-chip="'+esc(c)+'">'+esc(c)+'</button>';
  }).join('');
  els.starterChips.querySelectorAll('[data-chip]').forEach(function(b){
    b.addEventListener('click',function(){addChip(b.dataset.chip)});
  });
  renderDraft();
}

function renderDraft(){
  var captured=phases.filter(function(p){return state[p.id].consensus.trim()}).length;
  var pct=Math.round(captured/phases.length*100);
  setText(els.progressText,captured+' of '+phases.length+' sections captured.');
  setText(els.phaseProgressLabel,'Workshop progress: '+captured+' of '+phases.length+' captured');
  els.progressBar.style.width=pct+'%';
  els.sideProgressBar.style.width=pct+'%';
  els.draftScroll.innerHTML=phases.map(function(p){
    var isCurrent=p.id===current;
    return '<article class="draft-section'+(isCurrent?' current':'')+'"'+(isCurrent?' aria-current="true"':'')+'><h3>'+p.id+'. '+esc(p.title)+(isCurrent?'<span class="vh"> (current phase)</span>':'')+'</h3><p>'+esc(state[p.id].consensus.trim()||'Awaiting group consensus.')+'</p></article>';
  }).join('');
  updateTabs();
}

function addChip(c){
  var b=els.consensusInput,pfx=b.value.trim()?b.value.trim()+'\n':'';
  b.value=pfx+c+': ';
  state[current].consensus=b.value;
  b.focus();
  save();
}

function setPhase(id,opts){
  opts=opts||{};
  current=Math.min(phases.length,Math.max(1,id));
  stopTimer(false);
  timerSeconds=480;
  updateTimerReadout();
  render();
  window.scrollTo({top:0,behavior:reducedMotion&&reducedMotion.matches?'auto':'smooth'});
  if(opts.focusTab){$('tab-'+current).focus()}
  else if(opts.focusHeading){els.phaseTitle.focus()}
}
function nextPhase(){setPhase(current===phases.length?1:current+1,{focusHeading:true})}
function prevPhase(){setPhase(current===1?phases.length:current-1,{focusHeading:true})}

/* --- Timer --- */
function fmt(s){return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2)}
function updateTimerReadout(){
  setText(els.timerReadout,fmt(timerSeconds));
  els.timerReadout.setAttribute('aria-label','Time remaining '+fmt(timerSeconds));
  setText(els.timerBtn,timerHandle?'Pause timer':'Start '+fmt(timerSeconds)+' timer');
}
function toggleTimer(){
  if(timerHandle){stopTimer(true);return}
  timerHandle=setInterval(function(){
    timerSeconds=Math.max(0,timerSeconds-1);
    updateTimerReadout();
    if(!timerSeconds){stopTimer(false);showToast('Time is up — capture the group consensus')}
  },1000);
  updateTimerReadout();
  showToast('Timer started: '+fmt(timerSeconds)+' remaining');
}
function stopTimer(announce){
  if(timerHandle){clearInterval(timerHandle);timerHandle=null}
  updateTimerReadout();
  if(announce)showToast('Timer paused at '+fmt(timerSeconds));
}

/* --- Export / clipboard --- */
function plainText(){
  return ['Agency AI Adoption Strategy Workshop Capture','','Drafted from Socratic Sandbox consensus notes.','']
    .concat(phases.reduce(function(a,p){
      return a.concat([p.id+'. '+p.title,'',state[p.id].consensus.trim()||'Awaiting group consensus.','']);
    },[])).join('\n');
}
function draftHtml(){
  var body=phases.map(function(p){
    var c=state[p.id].consensus.trim();
    return '<h2>'+p.id+'. '+esc(p.title)+'</h2><p>'+(c?esc(c).replace(/\n/g,'<br>'):'<em>Awaiting group consensus.</em>')+'</p>';
  }).join('');
  return '<h1>Agency AI Adoption Strategy Workshop Capture</h1><p><em>Drafted from Socratic Sandbox consensus notes.</em></p>'+body;
}
function wordDocument(){
  return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'
    +'<head><meta charset="utf-8"><title>Agency AI Adoption Strategy Workshop Capture</title>'
    +'<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->'
    +'<style>'
    +'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#182330}'
    +'h1{font-size:20pt;color:#102b48}'
    +'h2{font-size:14pt;color:#17375f;margin-top:18pt}'
    +'p{line-height:1.4}'
    +'</style></head><body>'+draftHtml()+'</body></html>';
}
function exportWord(){
  try{
    var blob=new Blob([wordDocument()],{type:'application/msword'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download='agency-ai-strategy-workshop-capture.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function(){URL.revokeObjectURL(url)},2000);
    showToast('Draft exported as Word document');
  }catch(e){
    showToast('Download blocked here — use Copy Draft instead');
  }
}
function legacyCopy(text){
  var ta=document.createElement('textarea');
  ta.value=text;
  ta.setAttribute('readonly','');
  ta.style.position='fixed';
  ta.style.opacity='0';
  document.body.appendChild(ta);
  ta.select();
  var ok=false;
  try{ok=document.execCommand('copy')}catch(e){}
  ta.remove();
  return ok;
}
function copyText(text,btn,label){
  function done(ok){
    if(ok){
      setText(btn,'Copied');
      showToast('Copied to clipboard');
      setTimeout(function(){setText(btn,label)},1100);
    }else{
      showToast('Copy blocked — select the text and copy manually');
    }
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){done(true)},function(){done(legacyCopy(text))});
  }else{
    done(legacyCopy(text));
  }
}
function copyRichText(html,text,btn,label){
  function fallback(){copyText(text,btn,label)}
  if(window.ClipboardItem&&navigator.clipboard&&navigator.clipboard.write){
    var item;
    try{
      item=new ClipboardItem({
        'text/html':new Blob([html],{type:'text/html'}),
        'text/plain':new Blob([text],{type:'text/plain'})
      });
    }catch(e){fallback();return}
    navigator.clipboard.write([item]).then(function(){
      setText(btn,'Copied');
      showToast('Copied formatted draft to clipboard');
      setTimeout(function(){setText(btn,label)},1100);
    },fallback);
  }else{
    fallback();
  }
}

function showToast(m){
  setText(els.toast,m);
  els.toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t=setTimeout(function(){els.toast.classList.remove('show')},2400);
}

/* --- Reset --- */
function doReset(){
  try{localStorage.removeItem(STORAGE_KEY)}catch(e){}
  state=defaults();
  current=1;
  timerSeconds=480;
  stopTimer(false);
  render();
  showToast('All workshop notes cleared');
}
els.resetBtn.addEventListener('click',function(){
  if(typeof els.resetDialog.showModal==='function'){
    els.resetDialog.returnValue='';
    els.resetDialog.showModal();
  }else if(window.confirm('Reset all workshop notes?')){
    doReset();
  }
});
els.resetDialog.addEventListener('close',function(){
  if(els.resetDialog.returnValue==='confirm')doReset();
});

/* --- Wiring --- */
els.contextInput.addEventListener('input',function(e){
  state[current].context=e.target.value;
  els.promptText.textContent=phase().prompt(e.target.value.trim()||'[Insert '+phase().label+']');
  save();
});
els.notesInput.addEventListener('input',function(e){state[current].notes=e.target.value;save()});
els.consensusInput.addEventListener('input',function(e){
  state[current].consensus=e.target.value;
  setText(els.phasePill,e.target.value.trim()?'Captured':'Not captured');
  save();
});
els.copyPromptBtn.addEventListener('click',function(e){copyText(els.promptText.textContent,e.currentTarget,'Copy Prompt')});
els.copyDraftBtn.addEventListener('click',function(e){copyRichText(draftHtml(),plainText(),e.currentTarget,'Copy Draft')});
els.exportWordBtn.addEventListener('click',exportWord);
els.exportTopBtn.addEventListener('click',exportWord);
els.nextBtn.addEventListener('click',nextPhase);
els.nextTopBtn.addEventListener('click',nextPhase);
els.prevBtn.addEventListener('click',prevPhase);
els.prevTopBtn.addEventListener('click',prevPhase);
els.timerBtn.addEventListener('click',toggleTimer);
els.focusBtn.addEventListener('click',function(e){
  var on=document.body.classList.toggle('focus-mode');
  setText(e.currentTarget,on?'Show Draft':'Focus Mode');
  showToast(on?'Draft panel hidden':'Draft panel shown');
});

buildTabs();
updateTimerReadout();
render();
</script>
</body>
</html>
