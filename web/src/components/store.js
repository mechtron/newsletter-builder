import Vue from "vue";

export const store = Vue.observable({
    newsletters: {},
    selected_newsletter: 0,
    selected_article: 0,
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
