<template>
  <div class="student-card" :class="cardStyle">
    <div class="drag-icon col"></div>
    <div class="student-avatar">
      <span :class="initialStyle">{{initial}}</span>
    </div>
    <div class="student-name col">{{firstName}} {{lastName}}</div>
    <div class="student-id col">{{studentId}}</div>
    <div class="student-phone col">{{phone}}</div>
    <div class="actions col">
      <div class="edit-student" @click="$emit('editInfo')">
        <ion-icon name="create"></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    studentId: { type: Number, default: undefined },
    phone: { type: Number, default: undefined },
    status: { type: String, default: "active" },
    initial: { type: String, default: "" }
  },
  computed: {
    cardStyle() {
      switch (this.status) {
        case "Active":
          return "active";
        case "Delinquent":
          return "delinquent";
        case "Dropped":
          return "dropped";
      }
    },
    initialStyle() {
      const regex1 = /[A-F]/gi;
      const regex2 = /[G-L]/gi;
      const regex3 = /[M-R]/gi;
      const regex4 = /[S-Z]/gi;
      const initial = this.initial;

      if (initial.match(regex1)) {
        return "initialStyle-1";
      } else if (initial.match(regex2)) {
        return "initialStyle-2";
      } else if (initial.match(regex3)) {
        return "initialStyle-3";
      } else if (initial.match(regex4)) {
        return "initialStyle-4";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.student-card {
  width: 100%;
  min-height: 70px;
  min-width: 700px;
  border-radius: 8px;
  border: 1px solid #dde5ec;
  background-color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
  padding: 0 20px 0 30px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.8s;
  @include fontStyle(16px, 300, 25px);

  .col {
    padding: 0 10px;
    box-sizing: border-box;
  }

  &.active {
    &:after {
      background-color: $status-active;
    }
    &:hover {
      border: 1px solid $status-active;
    }
  }
  &.delinquent {
    &:after {
      background-color: $status-delinquent;
    }
    &:hover {
      border: 1px solid $status-delinquent;
    }
  }
  &.dropped {
    &:after {
      background-color: $status-dropped;
    }
    &:hover {
      border: 1px solid $status-dropped;
    }
  }

  &:after {
    content: "";
    display: block;
    @include size(8px, 100px);
    position: absolute;
    top: 0;
    left: 0;
  }

  .drag-icon {
    @include size(10px, 19px);
    background: url("~@/assets/drag-icon.svg") no-repeat center;
  }

  .student-avatar {
    padding: 0 20px;
    @include size(48px, 48px);

    span {
      @include flexCenter;
      border-radius: 50%;
      @include size(48px, 48px);
      text-transform: uppercase;
      font-size: 18px;

      &.initialStyle-1 {
        background-color: rgba($avatar-01, 0.1);
        color: $avatar-01;
      }
      &.initialStyle-2 {
        background-color: rgba($avatar-02, 0.1);
        color: $avatar-02;
      }
      &.initialStyle-3 {
        background-color: rgba($avatar-03, 0.1);
        color: $avatar-03;
      }
      &.initialStyle-4 {
        background-color: rgba($avatar-04, 0.1);
        color: $avatar-04;
      }
    }
  }

  .student-name {
    @include fontStyle(16px, 600, 25px);
    min-width: 220px;
  }
  .student-id {
    min-width: 120px;
  }
  .student-phone {
    min-width: 150px;
  }

  .actions {
    min-width: 50px;
    @include size(28px);
    position: absolute;
    right: 20px;

    .edit-student {
      @include size(28px);
      @include flexCenter;
      border: 1px solid $bluegray-shallow;
      border-radius: 4px;
      transition: 0.5s;

      &:hover {
        background-color: $secondary;
        border: 1px solid $secondary;
        ion-icon {
          color: #fff;
        }
      }

      ion-icon {
        color: $bluegray;
        font-size: 16px;
      }
    }
  }
}
</style>