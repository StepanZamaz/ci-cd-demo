# 🚀 CI/CD Pipeline Workshop: Automatické nasazení s GitHub Actions a Vercel

**Autoři:** Štěpán Zamazal, Marek Pavlíček

Tento repozitář slouží jako praktická ukázka implementace Continuous Integration (CI) a Continuous Deployment (CD) pro moderní webové aplikace, s využitím **GitHub Actions** a **Vercel**.

---

## 💡 Koncept CI/CD: Od vývoje do produkce

CI/CD je moderní softwarová praxe (DevOps), která nahrazuje ruční, chybové procesy automatizovanými. Cílem je **rychlejší, spolehlivější a bezpečnější dodávání softwaru** s minimalizací lidské chyby.

### Continuous Integration (CI) – Kontinuální Integrace
Je to přístup, při kterém vývojáři **často slučují kódu** (integrují) své malé a ověřené změny kódu do sdíleného centrálního repozitáře (např. hlavní větev).

* **Základní princip:** Každý `git push` spustí **automatický Build a Test** proces.
* **Klíčová výhoda:** **Včasná detekce** integračních problémů a chyb (tzv. "fail fast"), což usnadňuje jejich opravu.

### Continuous Deployment (CD) – Kontinuální Nasazování
Navazuje na CI. Kód, který **úspěšně prošel** fází CI (build a testy), je automaticky posunut k nasazení.

* **Continuous Deployment (CDep):** Kód je **plně automaticky nasazen** do produkce, pokud prošel všemi kontrolami a testy.
* **Continuous Delivery (CDel):** Kód je **automaticky připraven do produkce**, ale vyžaduje manuální schválení.

---

## 🛠️ Prerekvizity (Použité Nástroje)

Pro naši ukázku využíváme silnou kombinaci nástrojů, z nichž každý plní specifickou úlohu v pipeline:

### 1. GitHub
Slouží ke **správě kódu a verzování** (Source Code Management – SCM). Bez Gitu a vzdáleného repozitáře by nebylo co integrovat ani nasazovat.

### 2. GitHub Actions
Je to **automatizační platforma (CI/CD Engine)**, která řídí celý proces nasazení.

* **Architektura:** Využívá konfigurační soubory ve formátu **YAML** (tzv. **Workflows**), které definují **Joby** a **Kroky** (sekvence příkazů).
* **Způsob spuštění:** Je **event-driven**, tj. spouští se na základě událostí v repozitáři (např. `push` na konkrétní větev).
* **Úloha:** Spouští Vercel CLI pro nasazení a zajišťuje, že se kód nasadí až po úspěšném sestavení a testování.

### 3. Vercel
Je **platforma pro nasazení aplikací** – naše cílové hostingové prostředí. Je optimalizovaná pro statické a serverless aplikace (Jamstack, Next.js, React).

* **Global Edge Network (CDN):** Poskytuje automatické škálování a distribuci obsahu přes globální síť.
* **Preview Deployments:** Vercel umožňuje nasadit **dočasnou verzi** aplikace pro každý Pull Request, což usnadňuje vizuální testování před sloučením kódu.

### 4. Vercel CLI
Je **nástroj pro ovládání Vercelu z příkazové řádky**. Používá se v rámci GitHub Actions workflow, aby se zajistilo, že náš CI/CD motor může komunikovat s Vercel hostingem.

---

## ⚙️ Cvičení: Nastavení Pipeline

Tento návod vás provede nastavením prostředí, které je nezbytné před napsáním samotného CI/CD workflow souboru.

### 1. Příprava kódu a repozitáře (GitHub a Vercel)

1.  **Vytvořte nový prázdný repozitář na GitHubu**.
2.  **Přesuňte kód** z ukázkové aplikace (např. [https://github.com/StepanZamaz/ci-cd-demo](https://github.com/StepanZamaz/ci-cd-demo)) do nového repa a proveďte **push**.
3.  **Vytvořte účet na Vercelu a proveďte napojení na GitHub repo**.
4.  **Odpojte Vercel od GitHub repa**. Tím zajistíme, že nasazení bude plně řízeno pouze z GitHub Actions.

### 2. Tvorba Secrets na GitHubu

Aby mohla GitHub Action nasadit aplikaci na Vercel, musí mít přístup k vašim tokenům a ID projektu. Tyto citlivé údaje uložíme jako **Secrets** do nastavení GitHub repozitáře.

| Secret | Účel a kde ho získat |
| :--- | :--- |
| **`VERCEL_TOKEN`** | **Autentizační klíč (API Token)** k vašemu účtu Vercel. Získáte jej z **vercel acount tokens**. |
| **`VERCEL_ORG_ID`** | Identifikátor týmu/organizace na Vercel. Získáte jej z **dashboard setting - teamId**. |
| **`VERCEL_PROJECT_ID`**| Identifikátor vašeho konkrétního projektu na Vercel. Získáte jej z **project settings - projId**. |

---

## ✅ Otestování nasazení

Po vytvoření a nahrání CI/CD workflow souboru (např. `deploy.yml`) otestujte, že automatizace funguje správně:

1.  **Změňte message v endpointu** (např. v index.html nebo v kódu aplikace).
2.  Proveďte **Commit + push**.
3.  **Otestujte správnost CI/CD:** Sledujte GitHub Actions. **Špatné testy = nenasazení aplikace**. Pokud vše proběhne správně, Vercel automaticky zobrazí novou zprávu.

---

## ⏭️ Co dál? Rozšíření pipeline

Pro pokročilé a produkční aplikace je nutné pipeline rozšířit o kontrolu kvality a další ověřovací kroky.

* **Statická analýza kódu** (Linting): Kontrola stylu a zranitelností kódu před spuštěním testů.
* **Jednotkové a integrační testy** (Unit/Integration Tests): Zajištění, že komponenty kódu fungují dle očekávání.
* **Testování na testovacím prostředí** (Staging/Preview Deployments): Vizuální kontrola nových funkcí před sloučením kódu do hlavní větve.
* **End-to-End Testování** (E2E Tests): Automatické testy simulující chování skutečného uživatele na nasazené aplikaci.