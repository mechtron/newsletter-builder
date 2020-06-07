import Vue from "vue";

export const store = Vue.observable({
    newsletters: {
        0: {
            version: "1.1.0",
            date: "2020-04-15",
            intro: "Welcome to issue #0",
            articles: [
                {
                    url: "https://google.com",
                    title: "Test title",
                    author: "Test Author",
                    description: "Example description",
                    image_url: "",
                    category: "📟 DevOps",
                    top_cream: true
                }
            ]
        }
    },
    selected_newsletter: 0,
    selected_article: 0,
    article_categories: [
        { text: 'Select One', value: null },
        '🌎 Society',
        '📟 DevOps',
        '🛠️ DevOps Tools',
        '☸️ Kubernetes',
        '🔐 Security',
        '💻 Programming',
        '🐧 Linux',
        '🔩 Hardware',
        '🚢 Leadership',
        '☁️ Cloud',
        'AWS',
        'Azure',
        'GCP'
    ],
    newsletter_markup: "",
    newsletter_markup_updated: "never"
});

export const mutations = {
    setNewsletter(selected_newsletter) {
        store.selected_newsletter = selected_newsletter;
    },
    setArticle(selected_article) {
        store.selected_article = selected_article;
    },
    setNewsletterMarkup(newsletter_markup) {
        store.newsletter_markup = newsletter_markup;
    },
    setNewsletterMarkupLastUpdated(last_updated) {
        store.newsletter_markup_updated = last_updated;
    },
    updateNewsletterData(newsletters) {
        store.newsletters = newsletters;
        store.selected_newsletter = 0;
        store.selected_article = 0;
        store.newsletter_markup = "";
        store.newsletter_markup_updated = "never";
    }
};
