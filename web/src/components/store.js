import Vue from "vue";

export const store = Vue.observable({
    newsletters: {
        0: {
            version: "1.1.0",
            date: "2020-04-15",
            intro: "Welcome to issue #0",
            articles: [
                {
                    url: "1",
                    author: "1",
                    description: "1",
                    image_url: "1",
                    category: "1",
                    top_cream: false
                }
            ]
        },
        1: {
            version: "1.0.0",
            date: "2020-04-30",
            intro: "Welcome to issue #1",
            articles: [
                {
                    url: "1",
                    author: "1",
                    description: "1",
                    image_url: "1",
                    category: "1",
                    top_cream: false
                },
                {
                    url: "2",
                    author: "2",
                    description: "2",
                    image_url: "2",
                    category: "2",
                    top_cream: true
                },
                {
                    url: "3",
                    author: "3",
                    description: "3",
                    image_url: "3",
                    category: "3",
                    top_cream: false
                },
                {
                    url: "4",
                    author: "4",
                    description: "4",
                    image_url: "4",
                    category: "4",
                    top_cream: false
                }
            ]
        },
        2: {
            version: "0.1.0",
            date: "2020-05-15",
            intro: "Welcome to issue #2",
            articles: []
        }
    },
    selected_newsletter: 1,
    selected_article: 0
});

export const mutations = {
    setNewsletter(selected_newsletter) {
        store.selected_newsletter = selected_newsletter;
    },
    setArticle(selected_article) {
        store.selected_article = selected_article;
    }
};
