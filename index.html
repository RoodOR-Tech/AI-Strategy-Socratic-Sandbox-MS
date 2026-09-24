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
          <p class="small" id="notesHint">Optional: paste useful AI questions, risks, or phrases here. This will not export unless the group deliberately rewrites it into approved strategy content.</p>
        </div>
      </div>
    </div>
    <details class="card"><summary>Private workshop discussion (optional)</summary><div class="card-body"><label for="discussionInput">Unresolved discussion notes — excluded from strategy</label><textarea id="discussionInput"></textarea></div></details>
    <div class="card">
      <div class="card-head"><h3>Step 3: Decide and Capture</h3><span class="small">Human-approved content only</span></div>
      <div class="card-body">
        <p class="small" id="captureHint">Capture the group’s decisions in concise strategy language. Use a line beginning with “- ” for each bullet. Fields are optional; review before approving.</p>
        <div id="captureFields" class="capture-fields"></div>
        <label class="approval"><input type="checkbox" id="approveSection"> The group approves this section for the strategy</label>
        <p class="small">Editing a strategy field returns this section to review. Context, AI scratchpad and discussion stay private.</p>
      </div>
    </div>
  </div>
</section>

<aside class="draft" aria-label="Strategy draft">
  <div class="draft-head">
    <h2>Developing Strategy</h2>
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
  <p>This permanently clears all V2 metadata, context, scratchpad, discussion, strategy decisions, and implementation priorities stored in this browser. This cannot be undone.</p>
  <form method="dialog">
    <button class="btn secondary" value="cancel" type="submit">Cancel</button>
    <button class="btn danger" value="confirm" type="submit">Reset all notes</button>
  </form>
</dialog>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script src="assets/state.js"></script>
<script src="assets/phases.js"></script>
<script src="assets/strategy-content.js"></script>
<script src="assets/app.js"></script>
</body>
</html>
