import React, { useState, useEffect } from 'react';

const SearchApp = () => {
	const [query, setQuery] = useState('');
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(data => setPosts(data))
			.catch(error => console.error('Ошибка загрузки данных:', error))
	}, [])

	const handleInputChange = event => {
		setQuery(event.target.value)
	}

	const handleSearch = () => {
		const lowerCaseQuery = query.toLowerCase()
		const results = posts.filter(
			post =>
				post.title.toLowerCase().includes(lowerCaseQuery) ||
				post.body.toLowerCase().includes(lowerCaseQuery)
		)
		setFilteredPosts(results)
	}

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			<h1>Поисковик</h1>
			<div style={{ marginBottom: '20px' }}>
				<input
					type='text'
					placeholder='Введите запрос'
					value={query}
					onChange={handleInputChange}
					style={{ padding: '10px', width: '300px', marginRight: '10px' }}
				/>
				<button onClick={handleSearch} style={{ padding: '10px' }}>
					Найти
				</button>
			</div>
			<div>
				{filteredPosts.length > 0 ? (
					<ul>
						{filteredPosts.map(post => (
							<li key={post.id} style={{ marginBottom: '15px' }}>
								<h3>{post.title}</h3>
								<p>{post.body}</p>
							</li>
						))}
					</ul>
				) : (
					<p>Ничего не найдено.</p>
				)}
			</div>
		</div>
	)
}

export default SearchApp;
