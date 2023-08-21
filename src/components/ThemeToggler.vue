<template>
	<div id="theme_toggler">
		<input
            @change="toggle_theme"
			ref="theme_toggler_btn"
			type="checkbox"
			id="theme_toggler_btn"
			class="checkbox opacity-0 position-absolute"
		/>
		<label class="label" for="theme_toggler_btn">
			<ion-icon v-pre name="sunny"></ion-icon>
			<ion-icon v-pre name="moon"></ion-icon>
			<div class="ball"></div>
		</label>
	</div>
</template>

<script>
export default {
	name: "ThemeToggler",
	mounted() {
		if (localStorage.getItem("dark-theme") == "yes") {
			this.set_dark_mode();
			this.$refs.theme_toggler_btn.checked = !this.$refs.theme_toggler_btn.checked;
		}
	},
	methods: {
		toggle_theme() {
			if (document.documentElement.hasAttribute("theme")) {
				localStorage.setItem("dark-theme", "no");
				document.documentElement.removeAttribute("theme");
			} else this.set_dark_mode();
		},
		set_dark_mode() {
			localStorage.setItem("dark-theme", "yes");
			document.documentElement.setAttribute("theme", "dark");
		},
	},
};
</script>

<style scoped>
#theme_toggler .checkbox {
	opacity: 0;
	position: absolute;
}
#theme_toggler .label {
	background-color: #343a40;
	border-radius: 50px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
	position: relative;
	height: 23px;
	width: 48px;
	transform: scale(1.5);
}
#theme_toggler .label .ball {
	background-color: #fafafa;
	border-radius: 50%;
	position: absolute;
	top: 2px;
	left: 2px;
	height: 20px;
	width: 20px;
	transform: translateX(0px);
	transition: transform 0.2s linear;
}
#theme_toggler .checkbox:checked + .label .ball {
	transform: translateX(24px);
}
#theme_toggler .label {
	color: yellow;
	font-size: 0.5em;
}
</style>
