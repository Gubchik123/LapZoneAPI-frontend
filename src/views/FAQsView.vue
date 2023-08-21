<template>
	<BaseLayout title="FAQs" content_title="FAQs page">
		<template #advanced_content>
            <Alert category="primary" message="Soon" />
        </template>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import Alert from "@/components/Alert.vue";

export default {
    name: "FAQsView",
    components: { BaseLayout, Alert }
};
</script>
