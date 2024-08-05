<template>
  <a-card>
    <div style="display: flex; flex-direction: column; gap: 20px">
      <h1>stories</h1>
      <stories-view />
      <h1>Analytics</h1>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10%;
        "
      >
        <analytics-card
          title="Stories"
          dispatchMethod="getAllStories"
          getterMethod="getStories"
        />
        <analytics-card
          title="Categories"
          dispatchMethod="getAllCategories"
          getterMethod="getCategories"
        />
        <analytics-card
          title="Type Of Work"
          dispatchMethod="getAllTypesOfWork"
          getterMethod="getTypesOfWork"
        />
      </div>
    </div>
  </a-card>
</template>

<script>
import StoriesView from "@/components/story/StoriesView.vue";
import AnalyticsCard from "@/components/home/AnalyticsCard.vue";
export default {
  components: { StoriesView, AnalyticsCard },
  created() {},
};
</script>

<style></style>
