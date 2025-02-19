
const News = () => {
  // Static news data with detailed descriptions
  const newsItems = [
    {
      id: 1,
      title: 'New Tech Product Launch: Product X',
      date: 'February 19, 2025',
      description:
        'Product X, a groundbreaking new tech product, has officially launched today. With its cutting-edge features, including AI-driven functionality, seamless integration with other devices, and an intuitive user interface, Product X is poised to revolutionize the industry. Tech enthusiasts and professionals are already excited about its potential. Available for pre-order today, the product promises to enhance productivity and ease of use in various fields. Early reviews suggest it’s one of the best products to hit the market in 2025.',
    },
    {
      id: 2,
      title: 'Product Hunt Spotlight: Product Y',
      date: 'February 18, 2025',
      description:
        'Product Y has been featured on Product Hunt as one of the top new products this week. This innovative solution is designed to simplify project management for teams. It allows for real-time collaboration, smart task prioritization, and integrates with popular tools such as Slack and Trello. Users have praised its sleek design and ease of use, making it a game-changer in the project management space. With its competitive pricing and advanced features, Product Y is quickly gaining traction in the market.',
    },
    {
      id: 3,
      title: 'Upcoming Event: Tech Conference 2025',
      date: 'February 17, 2025',
      description:
        'The Tech Conference 2025 is just around the corner, promising to be an unforgettable experience for tech enthusiasts. The event will feature top speakers from leading tech companies, with sessions covering a wide range of topics such as AI, cybersecurity, blockchain, and software development. Participants will also have the opportunity to network with industry leaders, learn about the latest trends, and attend hands-on workshops. Early registration is open, and tickets are expected to sell out quickly.',
    },
  ];

  return (
    <div className="news-container p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-center">Latest News</h2>
      <div className="news-list">
        {newsItems.map((item) => (
          <div key={item.id} className="news-item p-6 mb-6 bg-white border border-gray-200 rounded-md shadow-sm">
            <h3 className="font-bold text-xl text-blue-600 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{item.date}</p>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
