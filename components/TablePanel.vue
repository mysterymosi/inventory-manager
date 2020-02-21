<template>
  <div class="col-sm-12 tablePanel">
    <div class="card dashboardRow">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <slot></slot>
        <AppButton type="button" @click="$emit('onEndTheDay')" class="btn btn-success">END THE DAY</AppButton>
      </div>
    </div>
  </div>
</template>
<script>
import AppButton from '~/components/UI/AppButton'
export default {
  props: ["title"]
}
</script>