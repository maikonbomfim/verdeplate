import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const GOALS = [
  { id: "lose", label: "Emagrecer", desc: "Déficit calórico saudável", icon: "↓" },
  { id: "maintain", label: "Manter peso", desc: "Equilíbrio e bem-estar", icon: "→" },
  { id: "gain", label: "Ganhar massa", desc: "Superávit com proteína", icon: "↑" },
];
const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Sedentário", desc: "Pouco ou nenhum exercício" },
  { id: "light", label: "Leve", desc: "1–3 dias/semana" },
  { id: "moderate", label: "Moderado", desc: "3–5 dias/semana" },
  { id: "active", label: "Ativo", desc: "6–7 dias/semana" },
];
const ALLERGENS = [
  { id: "gluten", label: "Glúten" },
  { id: "soy", label: "Soja" },
  { id: "nuts", label: "Oleaginosas" },
  { id: "seeds", label: "Sementes" },
  { id: "mushroom", label: "Cogumelos" },
  { id: "coconut", label: "Coco" },
];
const DAYS_SHORT = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
const FALLBACK = ["#3B5C3A","#0d9488","#7c3aed","#d97706","#A0522D","#ea580c","#0369a1"];
const DISC = "Guia educativo — não substitui orientação de nutricionista.";

const FOOD_EMOJIS = [
  { words: ["tofu","tempeh"], emoji: "🫘" },
  { words: ["arroz"], emoji: "🍚" },
  { words: ["lentilha","feijão","grão","fradinho"], emoji: "🫘" },
  { words: ["brócolis","couve","espinafre"], emoji: "🥦" },
  { words: ["cenoura"], emoji: "🥕" },
  { words: ["batata"], emoji: "🥔" },
  { words: ["abacate"], emoji: "🥑" },
  { words: ["banana"], emoji: "🍌" },
  { words: ["maçã"], emoji: "🍎" },
  { words: ["laranja"], emoji: "🍊" },
  { words: ["quinoa","aveia"], emoji: "🌾" },
  { words: ["castanha","nozes","amendoim"], emoji: "🥜" },
  { words: ["azeite","óleo"], emoji: "🫙" },
  { words: ["cogumelo","shitake"], emoji: "🍄" },
  { words: ["sopa","caldo","miso"], emoji: "🍜" },
  { words: ["salada"], emoji: "🥗" },
  { words: ["curry"], emoji: "🍛" },
  { words: ["pizza"], emoji: "🍕" },
  { words: ["smoothie","vitamina"], emoji: "🥤" },
  { words: ["chocolate"], emoji: "🍫" },
  { words: ["uva","fruta","frutas"], emoji: "🍇" },
  { words: ["panqueca"], emoji: "🥞" },
];

function getFoodEmoji(text) {
  const lower = (text || "").toLowerCase();
  for (const { words, emoji } of FOOD_EMOJIS) {
    if (words.some(w => lower.includes(w))) return emoji;
  }
  return "🌿";
}

const T = {
  moss: "#3B5C3A", mossL: "#D4E4C8", mossM: "#6B8F5E",
  cream: "#F5F0E8", creamM: "#EDE5D4",
  terra: "#A0522D", terraL: "#F0E0D0",
  wg: "#7A7060", ink: "#1E1A14", border: "#D5CCBB", white: "#FFFFFF",
};

const baseBtn = { border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" };
const btnMoss = { ...baseBtn, width: "100%", padding: "15px", borderRadius: "10px", background: T.moss, color: T.white, fontSize: "14px", fontWeight: "500" };
const btnGhost = { ...baseBtn, width: "100%", padding: "15px", borderRadius: "10px", background: T.creamM, color: T.wg, fontSize: "14px" };

// ─── WELCOME ──────────────────────────────────────────────────────────────────

function WelcomeScreen({ onStart }) {
  const pillars = [
    { title: "Personalizado", desc: "Adaptado ao seu objetivo", emoji: "🎯" },
    { title: "Anti-letargia", desc: "Energia estável o dia todo", emoji: "⚡" },
    { title: "100% vegano", desc: "Sem produtos animais", emoji: "🌱" },
    { title: "7 dias", desc: "Plano semanal completo", emoji: "📅" },
  ];
  return (
    <div style={{ minHeight: "100dvh", background: T.cream, fontFamily: "Georgia,serif", maxWidth: 480, margin: "0 auto", color: T.ink, display: "flex", flexDirection: "column" }}>
      <div style={{ background: T.moss, padding: "52px 28px 40px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
          <svg width="100%" height="100%" viewBox="0 0 375 220" preserveAspectRatio="xMidYMid slice">
            <circle cx="310" cy="10" r="130" fill="white" />
            <circle cx="40" cy="200" r="90" fill="white" />
          </svg>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#9FE1CB", marginBottom: "16px", fontWeight: "500" }}>PLANO ALIMENTAR VEGANO</div>
          <h1 style={{ fontSize: "36px", fontWeight: "500", color: "white", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 12px" }}>
            Coma bem.<br />Sinta a<br />diferença.
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>IA que entende seu corpo,<br />seus objetivos e seu ritmo.</p>
        </div>
      </div>
      <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ background: T.white, borderRadius: "12px", border: `0.5px solid ${T.border}`, padding: "14px" }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>{p.emoji}</div>
              <div style={{ fontSize: "13px", fontWeight: "500", color: T.ink, marginBottom: "2px" }}>{p.title}</div>
              <div style={{ fontSize: "11px", color: T.wg, lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
        <div>
          <button type="button" onClick={onStart} style={btnMoss}>Criar meu plano</button>
          <p style={{ fontSize: "11px", color: T.wg, textAlign: "center", marginTop: "10px", lineHeight: 1.5 }}>{DISC}</p>
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ goal: "", activity: "", allergens: [], weight: "", height: "", age: "" });

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const toggleAllergen = (id) => set("allergens",
    profile.allergens.includes(id)
      ? profile.allergens.filter(a => a !== id)
      : [...profile.allergens, id]
  );

  function OptionCard({ selected, onClick, children }) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          borderRadius: "12px",
          border: `1.5px solid ${selected ? T.moss : T.border}`,
          padding: "16px 18px",
          display: "flex", gap: "14px", alignItems: "center",
          background: selected ? "#F0F5EC" : T.white,
          cursor: "pointer", textAlign: "left", width: "100%",
          fontFamily: "inherit", transition: "border-color 0.15s, background 0.15s",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {children}
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          border: `1.5px solid ${selected ? T.moss : T.border}`,
          background: selected ? T.moss : "transparent",
          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}>
          {selected && <div style={{ width: 8, height: 5, borderLeft: "1.5px solid white", borderBottom: "1.5px solid white", transform: "rotate(-45deg) translateY(-1px)" }} />}
        </div>
      </button>
    );
  }

  const steps = [
    {
      title: "Qual é seu objetivo?",
      sub: "Calibramos suas calorias e proteínas com base nisso.",
      valid: !!profile.goal,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {GOALS.map(g => (
            <OptionCard key={g.id} selected={profile.goal === g.id} onClick={() => set("goal", g.id)}>
              <div style={{ width: 44, height: 44, borderRadius: "10px", background: profile.goal === g.id ? T.mossL : T.creamM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                {g.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: "500", color: profile.goal === g.id ? T.moss : T.ink, marginBottom: "2px" }}>{g.label}</div>
                <div style={{ fontSize: "12px", color: T.wg }}>{g.desc}</div>
              </div>
            </OptionCard>
          ))}
        </div>
      ),
    },
    {
      title: "Nível de atividade?",
      sub: "Isso define quantas calorias você precisa por dia.",
      valid: !!profile.activity,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {ACTIVITY_LEVELS.map(a => (
            <OptionCard key={a.id} selected={profile.activity === a.id} onClick={() => set("activity", a.id)}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: "500", color: profile.activity === a.id ? T.moss : T.ink, marginBottom: "2px" }}>{a.label}</div>
                <div style={{ fontSize: "12px", color: T.wg }}>{a.desc}</div>
              </div>
            </OptionCard>
          ))}
        </div>
      ),
    },
    {
      title: "Alergias?",
      sub: "Selecionadas serão evitadas. Pule se não houver.",
      valid: true,
      content: (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {ALLERGENS.map(a => (
              <button
                key={a.id}
                type="button"
                onClick={() => toggleAllergen(a.id)}
                style={{
                  padding: "10px 18px", borderRadius: "20px",
                  border: `1.5px solid ${profile.allergens.includes(a.id) ? T.moss : T.border}`,
                  background: profile.allergens.includes(a.id) ? T.mossL : T.white,
                  color: profile.allergens.includes(a.id) ? T.moss : T.wg,
                  cursor: "pointer", fontSize: "13px",
                  fontWeight: profile.allergens.includes(a.id) ? "600" : "400",
                  fontFamily: "inherit", transition: "all 0.15s",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
          {profile.allergens.length === 0 && (
            <p style={{ fontSize: "13px", color: T.wg, fontStyle: "italic" }}>Nenhuma selecionada — tudo liberado.</p>
          )}
        </div>
      ),
    },
    {
      title: "Dados físicos",
      sub: "Opcionais, mas melhoram a precisão do cálculo.",
      valid: true,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { key: "age", label: "IDADE", placeholder: "ex: 28" },
            { key: "weight", label: "PESO (KG)", placeholder: "ex: 68" },
            { key: "height", label: "ALTURA (CM)", placeholder: "ex: 170" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", color: T.wg, display: "block", marginBottom: "6px" }}>{f.label}</label>
              <input
                type="number"
                placeholder={f.placeholder}
                value={profile[f.key]}
                onChange={e => set(f.key, e.target.value)}
                style={{ width: "100%", padding: "13px 14px", borderRadius: "10px", border: `1px solid ${T.border}`, background: T.white, fontSize: "15px", color: T.ink, boxSizing: "border-box", fontFamily: "inherit", outline: "none" }}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div style={{ minHeight: "100dvh", background: T.cream, fontFamily: "Georgia,serif", maxWidth: 480, margin: "0 auto", color: T.ink, display: "flex", flexDirection: "column" }}>
      <div style={{ height: "3px", background: T.creamM, flexShrink: 0 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: T.moss, transition: "width 0.3s" }} />
      </div>

      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        {step > 0 ? (
          <button type="button" onClick={() => setStep(s => s - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: T.wg, fontSize: "13px", padding: "0 0 16px", textAlign: "left", fontFamily: "inherit" }}>
            ← Voltar
          </button>
        ) : <div style={{ height: "16px" }} />}

        <div style={{ fontSize: "11px", color: T.wg, letterSpacing: "0.08em", marginBottom: "6px" }}>{step + 1} DE {steps.length}</div>
        <h2 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "500", letterSpacing: "-0.3px", color: T.ink }}>{current.title}</h2>
        <p style={{ margin: "0 0 24px", fontSize: "13px", color: T.wg, lineHeight: 1.5 }}>{current.sub}</p>

        <div style={{ flex: 1 }}>{current.content}</div>

        <div style={{ paddingTop: "24px" }}>
          <button
            type="button"
            onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onComplete(profile)}
            disabled={!current.valid}
            style={current.valid ? btnMoss : btnGhost}
          >
            {step < steps.length - 1 ? "Continuar" : "Gerar meu plano ✦"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GENERATING ───────────────────────────────────────────────────────────────

function GeneratingScreen({ profile, onReady }) {
  const [phase, setPhase] = useState(0);
  const loadSteps = ["Perfil analisado", "Calorias calculadas", "Montando as refeições", "Revisando equilíbrio nutricional"];
  const goalLabel = GOALS.find(g => g.id === profile.goal)?.label || "";
  const actLabel = ACTIVITY_LEVELS.find(a => a.id === profile.activity)?.label || "";

  useState(() => {
    const timers = loadSteps.map((_, i) => setTimeout(() => setPhase(i), i * 1600));
    fetch(`${API_URL}/api/generate-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then(r => r.json())
      .then(d => { if (d.error) throw new Error(d.error); setTimeout(() => onReady(d.plan, profile), 600); })
      .catch(() => setTimeout(() => onReady(null, profile), 1000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const circ = 2 * Math.PI * 30;

  return (
    <div style={{ minHeight: "100dvh", background: T.cream, fontFamily: "Georgia,serif", maxWidth: 480, margin: "0 auto", color: T.ink, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 28px", textAlign: "center" }}>
      <div style={{ background: T.mossL, color: T.moss, fontSize: "11px", fontWeight: "500", padding: "4px 14px", borderRadius: "20px", letterSpacing: "0.08em", marginBottom: "24px" }}>IA TRABALHANDO</div>

      <div style={{ width: 80, height: 80, margin: "0 auto 20px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", display: "flex", alignItems: "center", justifyContent: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)", position: "absolute" }}>
          <circle cx="40" cy="40" r="34" fill="none" stroke={T.creamM} strokeWidth="3" />
          <circle cx="40" cy="40" r="34" fill="none" stroke={T.moss} strokeWidth="3"
            strokeDasharray={`${circ * (phase + 1) / loadSteps.length} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease" }}
          />
        </svg>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", lineHeight: 1, zIndex: 1 }}>🌱</div>
      </div>

      <h2 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: "500", color: T.ink, letterSpacing: "-0.3px" }}>Criando seu plano</h2>
      <p style={{ margin: "0 0 28px", fontSize: "13px", color: T.wg }}>{loadSteps[phase]}...</p>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
        {loadSteps.map((s, i) => {
          const state = i < phase ? "done" : i === phase ? "active" : "wait";
          return (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "10px 14px", borderRadius: "10px", background: state === "active" ? T.mossL : state === "done" ? T.white : "transparent", border: state === "done" ? `0.5px solid ${T.border}` : "none", transition: "all 0.3s" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: state === "wait" ? T.creamM : T.moss, transition: "background 0.3s" }} />
              <span style={{ fontSize: "12px", color: state === "active" ? T.moss : state === "done" ? T.wg : T.creamM, fontWeight: state === "active" ? "500" : "400" }}>{s}</span>
            </div>
          );
        })}
      </div>

      <div style={{ background: T.white, borderRadius: "12px", border: `0.5px solid ${T.border}`, padding: "14px 16px", width: "100%", textAlign: "left" }}>
        <div style={{ fontSize: "11px", color: T.wg, letterSpacing: "0.06em", marginBottom: "8px", fontWeight: "600" }}>SEU PERFIL</div>
        {[["Objetivo", goalLabel], ["Atividade", actLabel], ["Restrições", profile.allergens?.join(", ") || "Nenhuma"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
            <span style={{ color: T.wg }}>{k}</span>
            <span style={{ fontWeight: "500", color: T.ink }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLAN ─────────────────────────────────────────────────────────────────────

function PlanScreen({ plan, profile, onReset }) {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [done, setDone] = useState({});
  const [substituting, setSubstituting] = useState(null);
  const [subLoading, setSubLoading] = useState(false);
  const [planData, setPlanData] = useState(plan);

  const days = planData?.days || [];
  const tdee = planData?.tdee || 2000;
  const day = days[activeDay];
  if (!day) return null;

  const color = day.color || FALLBACK[activeDay];
  const isDone = (i) => !!done[`${activeDay}-${i}`];
  const toggleDone = (mealIdx) => {
    setDone(p => ({ ...p, [`${activeDay}-${mealIdx}`]: !p[`${activeDay}-${mealIdx}`] }));
  };

  const completedCount = day.meals.filter((_, i) => isDone(i)).length;
  const totalKcal = day.meals.reduce((a, m) => a + (m.kcal || 0), 0);
  const eatenKcal = day.meals.filter((_, i) => isDone(i)).reduce((a, m) => a + (m.kcal || 0), 0);
  const pct = Math.round(completedCount / Math.max(day.meals.length, 1) * 100);
  const circ = 2 * Math.PI * 18;

  async function substituirRefeicao(mealIdx) {
    const meal = day.meals[mealIdx];
    setSubLoading(true);
    setSubstituting(mealIdx);

    const goalLabel = GOALS.find(g => g.id === profile.goal)?.label || "";
    const actLabel = ACTIVITY_LEVELS.find(a => a.id === profile.activity)?.label || "";
    const allergensLabel = profile.allergens?.length ? profile.allergens.join(", ") : "nenhuma";

    try {
      const response = await fetch(`${API_URL}/api/generate-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profile,
          substituir: true,
          refeicaoAtual: meal.label,
          itensAtuais: meal.items?.join(", "),
          dia: day.day,
        }),
      });
      const data = await response.json();

      if (data.substitution) {
        const newDays = days.map((d, di) => {
          if (di !== activeDay) return d;
          return {
            ...d,
            meals: d.meals.map((m, mi) => mi !== mealIdx ? m : data.substitution),
          };
        });
        setPlanData({ ...planData, days: newDays });
      }
    } catch (e) {
      console.error(e);
    }
    setSubLoading(false);
    setSubstituting(null);
  }

  return (
    <div style={{ minHeight: "100dvh", background: T.cream, fontFamily: "Georgia,serif", maxWidth: 480, margin: "0 auto", color: T.ink, display: "flex", flexDirection: "column" }}>

      {/* Sticky header */}
      <div style={{ background: T.white, borderBottom: `0.5px solid ${T.border}`, position: "sticky", top: 0, zIndex: 10, flexShrink: 0 }}>
        <div style={{ padding: "14px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "16px", fontWeight: "500", color: T.ink }}>
              Verde<span style={{ color: T.moss }}>Plate</span>
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: T.wg }}>~{tdee} kcal/dia</p>
          </div>
          <button type="button" onClick={onReset} style={{ background: "none", border: `0.5px solid ${T.border}`, borderRadius: "8px", padding: "5px 10px", cursor: "pointer", fontSize: "11px", color: T.wg, fontFamily: "inherit" }}>
            ↺ Refazer
          </button>
        </div>

        <div style={{ display: "flex" }}>
          {DAYS_SHORT.map((d, i) => {
            const isActive = activeDay === i;
            const dc = days[i]?.color || FALLBACK[i];
            const dd = (days[i]?.meals || []).filter((_, mi) => !!done[`${i}-${mi}`]).length;
            return (
              <button key={d} type="button"
                onClick={() => { setActiveDay(i); setExpandedMeal(null); }}
                style={{ flex: 1, textAlign: "center", padding: "8px 0", border: "none", background: "transparent", cursor: "pointer", fontSize: "11px", fontWeight: isActive ? "600" : "400", color: isActive ? T.moss : T.wg, borderBottom: `2px solid ${isActive ? T.moss : "transparent"}`, fontFamily: "inherit", position: "relative", WebkitTapHighlightColor: "transparent" }}
              >
                {d}
                {dd > 0 && !isActive && <span style={{ position: "absolute", top: 4, right: 4, width: 4, height: 4, borderRadius: "50%", background: dc }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "18px", background: T.cream }}>

        {/* Day header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "500", color: T.ink, letterSpacing: "-0.4px" }}>{day.day}</div>
            <div style={{ fontSize: "12px", color: T.mossM, marginBottom: "12px" }}>{day.theme}</div>
          </div>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke={T.creamM} strokeWidth="2.5" />
            <circle cx="22" cy="22" r="18" fill="none" stroke={T.moss} strokeWidth="2.5"
              strokeDasharray={`${circ * pct / 100} ${circ}`} strokeLinecap="round"
              transform="rotate(-90 22 22)" style={{ transition: "stroke-dasharray 0.4s ease" }}
            />
            <text x="22" y="27" textAnchor="middle" fontSize="10" fontWeight="500" fill={T.moss}>{pct}%</text>
          </svg>
        </div>

        {/* Macro bars */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "14px" }}>
          {[{ l: "Proteína", c: T.moss, w: "60%" }, { l: "Carboidrato", c: T.terra, w: "75%" }, { l: "Gordura", c: T.mossM, w: "45%" }].map((m, i) => (
            <div key={i} style={{ background: T.white, borderRadius: "8px", padding: "8px 10px", border: `0.5px solid ${T.border}` }}>
              <div style={{ fontSize: "10px", color: T.wg, marginBottom: "4px" }}>{m.l}</div>
              <div style={{ height: "3px", background: T.creamM, borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: m.w, background: m.c, borderRadius: "2px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Kcal progress */}
        <div style={{ height: "2px", background: T.creamM, borderRadius: "1px", marginBottom: "16px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: T.moss, borderRadius: "1px", width: `${totalKcal ? (eatenKcal / totalKcal) * 100 : 0}%`, transition: "width 0.4s" }} />
        </div>

        {/* Fasting */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", background: T.white, borderRadius: "10px", padding: "12px 14px", marginBottom: "10px", border: `0.5px solid ${T.border}` }}>
          <div style={{ width: 40, height: 40, borderRadius: "10px", background: T.mossL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "20px" }}>💧</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "500", color: T.ink }}>Manhã — Jejum</div>
            <div style={{ fontSize: "11px", color: T.wg }}>Água com limão · Chá verde</div>
          </div>
        </div>

        {/* Meals */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {day.meals.map((meal, i) => {
            const expanded = expandedMeal === i;
            const mealDone = isDone(i);
            const mealEmoji = getFoodEmoji(meal.items?.[0] || meal.label);
            const isSubbing = substituting === i && subLoading;

            return (
              <div key={i} style={{ background: T.white, borderRadius: "12px", border: `0.5px solid ${mealDone ? T.moss + "66" : T.border}`, overflow: "hidden", transition: "border-color 0.2s" }}>

                {/* Meal row */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", cursor: "pointer" }}
                  onClick={() => setExpandedMeal(expanded ? null : i)}>
                  <div style={{ width: 44, height: 44, borderRadius: "10px", background: mealDone ? T.mossL : T.creamM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                    {mealEmoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: mealDone ? T.wg : T.ink, textDecoration: mealDone ? "line-through" : "none" }}>{meal.label}</div>
                    <div style={{ fontSize: "11px", color: T.wg, marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {meal.time} · {meal.items?.[0]}{meal.items?.length > 1 ? ` +${meal.items.length - 1}` : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                    <span style={{ fontSize: "11px", color: T.wg }}>{meal.kcal} kcal</span>
                    {/* CHECK BUTTON — separate from expand */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleDone(i); }}
                      style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${mealDone ? T.moss : T.border}`, background: mealDone ? T.moss : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s", flexShrink: 0, WebkitTapHighlightColor: "transparent", padding: 0 }}
                    >
                      {mealDone && <div style={{ width: 9, height: 6, borderLeft: "2px solid white", borderBottom: "2px solid white", transform: "rotate(-45deg) translateY(-1px)" }} />}
                    </button>
                  </div>
                </div>

                {/* Expanded */}
                {expanded && (
                  <div style={{ padding: "0 14px 16px 14px", borderTop: `0.5px solid ${T.creamM}` }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "12px 0" }}>
                      {meal.items?.map((item, ii) => (
                        <div key={ii} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>{getFoodEmoji(item)}</span>
                          <span style={{ fontSize: "13px", color: T.ink, lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>

                    {meal.tip && (
                      <div style={{ borderLeft: `2px solid ${T.mossL}`, paddingLeft: "10px", marginBottom: "12px" }}>
                        <span style={{ fontSize: "12px", color: T.mossM, fontStyle: "italic" }}>{meal.tip}</span>
                      </div>
                    )}

                    {/* Substituir button */}
                    <button
                      type="button"
                      onClick={() => substituirRefeicao(i)}
                      disabled={isSubbing}
                      style={{ width: "100%", padding: "11px", borderRadius: "8px", border: `1px solid ${T.border}`, background: isSubbing ? T.creamM : T.white, color: isSubbing ? T.wg : T.moss, cursor: isSubbing ? "not-allowed" : "pointer", fontSize: "12px", fontWeight: "500", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                    >
                      {isSubbing ? "Buscando alternativa..." : "🔄 Sugerir outra opção"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reminders */}
        <div>
          <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", color: T.wg, marginBottom: "10px" }}>LEMBRETES</div>
          {[
            { text: "B12 — suplemento diário, essencial para veganos" },
            { text: "Vitamina D — 15 min de sol ou suplemento" },
            { text: "2–3L de água/dia, especialmente no jejum" },
            { text: DISC, warn: true },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px 14px", borderRadius: "10px", marginBottom: "6px", background: r.warn ? T.terraL : T.white, border: `0.5px solid ${r.warn ? T.terra + "44" : T.border}` }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: r.warn ? T.terra : T.moss, flexShrink: 0, marginTop: "7px" }} />
              <span style={{ fontSize: "12px", color: r.warn ? T.terra : T.wg, lineHeight: 1.5 }}>{r.text}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);

  if (screen === "welcome") return <WelcomeScreen onStart={() => setScreen("onboarding")} />;
  if (screen === "onboarding") return <OnboardingScreen onComplete={(p) => { setProfile(p); setScreen("generating"); }} />;
  if (screen === "generating") return <GeneratingScreen profile={profile} onReady={(p) => { setPlan(p); setScreen("plan"); }} />;
  if (screen === "plan") return <PlanScreen plan={plan} profile={profile} onReset={() => { setPlan(null); setProfile(null); setScreen("welcome"); }} />;
  return null;
}
