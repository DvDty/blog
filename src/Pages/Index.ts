import Page from './Page';
import Article from './Article';

export default class Index extends Page {
    public constructor(articles: Article[]) {
        super();

        articles.forEach((article: Article) => {
            this.html += `     
                <div style="margin-bottom: 40px;">
                    <div style="margin-bottom: 15px;">
                        <h1><a href="${article.htmlName}">${article.metadata.title}</a></h1>
                    </div>

                    <div>${article.metadata.created_at} • ${article.readingTime} min read</div>
                </div>
            `;
        });
    }
}
