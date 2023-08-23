<template>
	<main>
		<div class="container-fluid">
			<div class="row">
				<div class="my-3 content-between">
					<h2>{{ content_title }}</h2>

                    <slot name="to_right_of_content_title"></slot>
				</div>
			</div>
			<slot name="advanced_content">
                <div
                    class="row rounded px-3"
                    :class="{'mb-5': is_content_mb_5}"
                >
                    <div class="panel-bg-color col-12 rounded p-3">
                        <slot></slot>
                    </div>
                </div>
            </slot>
		</div>
	</main>
</template>

<script>
export default {
	name: "BaseLayout",
	props: {
		title: { type: String, required: true },
		content_title: { type: String, required: true },
        is_content_mb_5: { type: Boolean, default: true }
	},
	mounted() {
		document.title = `${this.title} | LapZoneAPI`;
	},
};
</script>
