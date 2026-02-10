const translations = {
    en: {
        features: "Features",
        privacy: "Privacy",
        contact: "Contact",
        hero_title: "Focus on the memories,<br>not the math.",
        hero_subtitle: "The easiest way to manage travel costs in multiple currencies. Works offline so you can explore without limits.",
        showcase_1: "Your Trips",
        showcase_2: "Expense Tracking",
        showcase_3: "Easy Entry",
        why_itaro: "Why Itaro?",
        feat_offline_title: "Works Offline",
        feat_offline_desc: "No signal? No problem. Add expenses anywhere, sync when you're back online.",
        feat_balance_title: "Smart Balances",
        feat_balance_desc: "Instantly see who owes who. We simplify the math so you don't have to.",
        feat_currency_title: "Multi-Currency",
        feat_currency_desc: "Spent Euros in Paris but want to settle in Dollars? We handle the conversion automatically.",
        feat_checklist_title: "Checklists & Links",
        feat_checklist_desc: "Shared packing lists and important travel links, all in one place for the whole group.",
        footer_copyright: "&copy; 2026 Itaro. Made with <i class='fa-solid fa-heart' style='color: var(--itaro-teal); font-size: 0.8em;'></i> for travelers.",
        privacy_title: "Privacy Policy",
        privacy_updated: "Last Updated: January 29, 2026",
        privacy_1_title: "1. Data Collection & Storage",
        privacy_1_desc: "We use <strong>Google Firebase</strong> to securely store and authenticate your data. We collect Account Info (Name, Email) and Trip Data (Expenses, Balances).",
        privacy_2_title: "2. Data Usage & Safety",
        privacy_2_desc: "Your data is used solely to facilitate expense splitting and sync across devices. <strong>We do not sell your personal data.</strong>",
        privacy_3_title: "3. Data Deletion",
        privacy_3_desc: "You can delete your account and all data instantly via the app: <em>Profile > Account > Delete Account</em>.",
        privacy_4_title: "4. Contact Us",
        privacy_4_desc: "Questions? DM us on Instagram at <a href='https://instagram.com/itaro.app' target='_blank' style='color: var(--itaro-teal);'>@itaro.app</a>."
    },
    pt: {
        features: "Funcionalidades",
        privacy: "Privacidade",
        contact: "Contato",
        hero_title: "Foque nas memórias,<br>não na matemática.",
        hero_subtitle: "A maneira mais fácil de gerenciar despesas de viagem em múltiplas moedas. Funciona offline para você explorar sem limites.",
        showcase_1: "Suas Viagens",
        showcase_2: "Controle de Gastos",
        showcase_3: "Registro Fácil",
        why_itaro: "Por que Itaro?",
        feat_offline_title: "Funciona Offline",
        feat_offline_desc: "Sem sinal? Sem problemas. Adicione despesas em qualquer lugar, sincronize quando estiver online.",
        feat_balance_title: "Saldos Inteligentes",
        feat_balance_desc: "Veja instantaneamente quem deve a quem. Nós simplificamos a matemática para você.",
        feat_currency_title: "Multi-Moedas",
        feat_currency_desc: "Gastou Euros em Paris mas quer acertar em Reais? Nós cuidamos da conversão automaticamente.",
        feat_checklist_title: "Checklists e Links",
        feat_checklist_desc: "Listas de bagagem compartilhadas e links importantes, tudo em um só lugar para o grupo todo.",
        footer_copyright: "&copy; 2026 Itaro. Feito com <i class='fa-solid fa-heart' style='color: var(--itaro-teal); font-size: 0.8em;'></i> por viajantes.",
        privacy_title: "Política de Privacidade",
        privacy_updated: "Última atualização: 29 de Janeiro de 2026",
        privacy_1_title: "1. Coleta e Armazenamento",
        privacy_1_desc: "Usamos <strong>Google Firebase</strong> para armazenar e autenticar seus dados com segurança. Coletamos Informações da Conta (Nome, Email) e Dados da Viagem (Despesas, Saldos).",
        privacy_2_title: "2. Uso e Segurança",
        privacy_2_desc: "Seus dados são usados apenas para facilitar a divisão de despesas e sincronização. <strong>Não vendemos seus dados pessoais.</strong>",
        privacy_3_title: "3. Exclusão de Dados",
        privacy_3_desc: "Você pode excluir sua conta e dados instantaneamente pelo app: <em>Perfil > Conta > Excluir Conta</em>.",
        privacy_4_title: "4. Fale Conosco",
        privacy_4_desc: "Dúvidas? Mande um DM no Instagram em <a href='https://instagram.com/itaro.app' target='_blank' style='color: var(--itaro-teal);'>@itaro.app</a>."
    }
};

function updateContent(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Check if existing content has HTML (like icons or links) we want to preserve?
            // For this simple implementation, we assume the translation string contains the full HTML if needed
            // (e.g. hero_title has <br>, footer has <i>)
            element.innerHTML = translations[lang][key];
        }
    });

    // Update active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Save preference
    localStorage.setItem('itaro_lang', lang);
    document.documentElement.lang = lang;
}

function initLocalization() {
    const savedLang = localStorage.getItem('itaro_lang');
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    const initialLang = savedLang || browserLang;

    updateContent(initialLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            updateContent(btn.dataset.lang);
        });
    });
}

document.addEventListener('DOMContentLoaded', initLocalization);
