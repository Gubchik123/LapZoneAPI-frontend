<template>
	<button
		@click="go_to_top"
		ref="go_to_top_btn"
		id="go-to-top-btn"
		name="Go to top"
	>
		<ion-icon v-pre name="arrow-up-outline"></ion-icon>
	</button>
</template>

<script>
export default {
	name: "GoToTopButton",
	mounted() {
		window.addEventListener("scroll", this.on_scroll);
	},
	beforeUnmount() {
		window.removeEventListener("scroll", this.on_scroll);
	},
	methods: {
		on_scroll() {
			if (
				document.body.scrollTop > 200 ||
				document.documentElement.scrollTop > 200
			)
				this.$refs.go_to_top_btn.classList =
					"d-flex justify-content-center align-items-center";
			else this.$refs.go_to_top_btn.classList = "";
		},
		go_to_top() {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and
		},
	},
};
</script>

<style scoped>
#go-to-top-btn {
	border: none;
	outline: none;
	position: sticky;
	border-radius: 10px;
	margin: 30px 0 30px auto;
	width: 50px;
	height: 50px;
	right: 30px;
	bottom: 75px;
	display: none; /* Hidden by default */

	color: white;
	opacity: 0.8;
	transition: 0.3s;
	text-decoration: none;
	background-color: var(--bs-dark);
}
#go-to-top-btn:hover {
	opacity: 1;
}
#go-to-top-btn ion-icon {
	font-size: 1.5em;
}
</style>
