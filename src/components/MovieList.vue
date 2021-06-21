<template>
  <div>
	<header class="header">
		<form @submit.prevent="searchForm(searchUrl + searchQuery)">
			<input type="text" v-model="searchQuery" placeholder="Search Movies">
		</form>	
	</header>
	<div class="container">
		<div v-if='movieList.length > 0'>
			<h2 v-if='latest' class="title">Latest Movies</h2>
			<div class="grid">
				<div v-for='movie in movieList' :key='movie.id' class="card">
					<div class="card__img" :style="{ background: 'url(' + movieImg(movie.poster_path) + ') center center no-repeat'}"></div>
					<div class="card__body">
						<h3 class="card__title">{{movie.title}} ({{movie.release_date.substring(0,4)}})</h3>
						<div class="card__average">
							<span :class="classAverage(movie.vote_average)">
								{{movie.vote_average}}
							</span>
						</div>
					</div>
				</div>	
			</div>
		</div>	
		<div v-else>
			<h2 class="title">
				Aucun résultat pour "{{searchQuery}}"
			</h2>
		</div>
	</div>
  </div>
</template>
<script>
export default {
	data (){
		return {
			apiUrl: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1',
			searchUrl: 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=',
			movieList: [],
			searchQuery: "",
			latest: true,
		}
	},
	mounted(){
		this.searchForm(this.apiUrl)
	},
	watch:{
		searchQuery: function(){
			console.log(this.searchQuery);
			if (this.searchQuery !== null){
				this.searchForm(this.searchUrl + this.searchQuery)
			}
		}
	},
	methods: {
		searchForm(url){
			this.latest = url == this.apiUrl ? true : false
			this.$http.get(url).then(response=>{
				this.movieList = (response.body.results);
				console.log(this.movieList);
			}, response=>{
				console.log(response);
				this.$http.get(this.apiUrl).then(newResponse=>{
					this.movieList = newResponse.body.results
				})
				this.latest = true
			}
			)
		},
		classAverage(average){
			if (average>=8){
				return 'card__averageNote--green'
			} else if ((average>=5)){
				return 'card__averageNote--orange'
			} else {
				return 'card__averageNote--red'
			}
		},
		movieImg(poster_path){
			if (poster_path == null){
				return require(`@/assets/no-image.png`)
			} else {
				return 'https://image.tmdb.org/t/p/w1280' + poster_path
			}
		}
	}
}
</script>
<style lang='scss'>
@import '@/assets/scss/_index.scss';
</style>