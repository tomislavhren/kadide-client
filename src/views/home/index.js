import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getNews } from '../../core/services/news/news.actions';

import './home.css';
import NewsItem from './NewsItem';

class Home extends PureComponent {

	componentDidMount() {
		this.props.getNews();
	}

	render() {
		const { news } = this.props;

		return (
			<main className="home">
				<div className="home__content">
					<div className="home__content-label">
						Izmjene u prometu
					</div>
					<div className="news">
						{!news.length &&
							<>
								<NewsItem isLoading={true} />
								<NewsItem isLoading={true} />
							</>
						}
						{news.map((newsItem, index) => (
							<NewsItem
								{...newsItem}
								key={index}
							/>
						))}
					</div>
				</div>
			</main>
		);
	}
}

function mapStateToProps({ news }) {
	return { news: news.news };
}

export default connect(mapStateToProps, { getNews })(Home);
