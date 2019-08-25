<template>
  <div class="student-card" :class="cardStyle">
    <div class="student-avatar" :class="initialStyle">{{initial}}</div>
    <div class="student-info">
      <div class="student-name">{{firstName}} {{lastName}}</div>
      <div class="student-detail">
        <div class="student-id">{{studentId}}</div>
        <div class="student-phone">
          <ion-icon name="call"></ion-icon>
          {{phone}}
        </div>
      </div>
    </div>
    <div class="actions">
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
  margin: 0 auto;
  max-width: 400px;
  min-height: 80px;
  border-radius: 8px;
  border: 1px solid #e2eaec;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 12px;
  cursor: pointer;
  transition: 0.8s;

  &.active {
    &:after {
      background-color: $green;
    }
    &:hover {
      border: 1px solid $green;
    }
  }
  &.delinquent {
    &:after {
      background-color: $yellow;
    }
    &:hover {
      border: 1px solid $yellow;
    }
  }
  &.dropped {
    &:after {
      background-color: $red;
    }
    &:hover {
      border: 1px solid $red;
    }
  }

  &:after {
    content: "";
    display: block;
    @include size(8px, 100px);
    position: absolute;
    top: 0;
    right: 0;
  }

  .student-avatar {
    @include size(52px);
    @include flexCenter;
    border-radius: 50%;
    margin: 0 25px;
    text-transform: uppercase;

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
  .student-info {
    .student-name {
      @include fontStyle(16px, 600, 25px);
    }
    .student-detail {
      display: flex;
      margin-top: 5px;

      .student-id {
        @include fontStyle(14px, 300, 20px);
        margin-right: 25px;
      }
      .student-phone {
        display: flex;
        align-items: center;
        @include fontStyle(14px, 300, 20px);
        color: $bluegray;
        ion-icon {
          margin-right: 4px;
        }
      }
    }
  }
  .actions {
    position: absolute;
    right: 20px;

    .edit-student {
      @include size(28px);
      @include flexCenter;
      border: 1px solid $bluegray-shallow;
      border-radius: 4px;
      transition: 0.5s;

      &:hover {
        background-color: $primary;
        border: 1px solid $primary;
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