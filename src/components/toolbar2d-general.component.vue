<script lang="ts" setup>
</script>

<template>
  <ul>
    <li><button><i class="icon icon-undo"></i></button></li>
    <li><button><i class="icon icon-redo"></i></button></li>
    <li class="sep"></li>
    <li><button><i class="icon icon-zoomout"></i></button></li>
    <li><button><i class="icon icon-zoomin"></i></button></li>
    <li class="sep"></li>
  </ul>
</template>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  content: '';

  &.icon-undo {
    background-image: url('https://icons.getbootstrap.com/assets/icons/arrow-counterclockwise.svg');
  }
  &.icon-redo {
    background-image: url('https://icons.getbootstrap.com/assets/icons/arrow-clockwise.svg');
  }
  &.icon-zoomout {
    background-image: url('https://icons.getbootstrap.com/assets/icons/zoom-out.svg');
  }
  &.icon-zoomin {
    background-image: url('https://icons.getbootstrap.com/assets/icons/zoom-in.svg');
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  li {

    & > button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      text-align: center;
      padding: 10px 12px;

      .icon {
        width: 20px;
        height: 20px;
      }

      &:hover, &:focus {
        background: #f1f1f1;
      }
    }

    &.sep {
      margin: 0 5px;
      width: 1px;
      height: 30px;
      background: #f1f1f1;
    }
  }
}
</style>
