<template>
  <div class="student-list-wrap">
    <h2 class="page-title">Student List</h2>
    <div class="page-actions">
      <div class="ation-left">
        <div class="show-students">
          <div class="student-key">Show Students:</div>
          <div class="student-qty">
            <span class="active">10</span>
            <span>20</span>
          </div>
        </div>
      </div>
      <div class="ation-right">
        <button>
          <ion-icon name="add"></ion-icon>Add Student
        </button>
      </div>
    </div>
    <div class="student-zone">
      <div class="student-board">
        <div class="zone-head">
          <div class="zone-head-left">
            <span class="active">Active</span>
          </div>
          <div class="zone-head-right">
            1-10 of 30
            <div class="arrows">
              <ion-icon name="arrow-dropleft"></ion-icon>
              <ion-icon name="arrow-dropright" class="active"></ion-icon>
            </div>
          </div>
        </div>
        <div class="zone-body">
          <div class="student-card" v-for="student in studentList" :key="student.id">
            <div class="student-avatar">A</div>
            <div class="student-info">
              <div class="student-name">{{student.firstName}} {{student.lastName}}</div>
              <div class="student-detail">
                <div class="student-id">{{student.id}}</div>
                <div class="student-phone">
                  <ion-icon name="call"></ion-icon>
                  {{student.phone}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="student-board">
        <div class="zone-head">
          <div class="zone-head-left">
            <span class="delinquent">Delinquent</span>
          </div>
          <div class="zone-head-right">
            1-10 of 30
            <div class="arrows">
              <ion-icon name="arrow-dropleft"></ion-icon>
              <ion-icon name="arrow-dropright" class="active"></ion-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="student-board">
        <div class="zone-head">
          <div class="zone-head-left">
            <span class="dropped">Dropped</span>
          </div>
          <div class="zone-head-right">
            1-10 of 30
            <div class="arrows">
              <ion-icon name="arrow-dropleft"></ion-icon>
              <ion-icon name="arrow-dropright" class="active"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentList: [
        {
          firstName: "Anna",
          lastName: "Huang",
          id: "100001",
          phone: "4033072408",
          status: "active"
        },
        {
          firstName: "Hashim",
          lastName: "Briscam",
          id: "100002",
          phone: "4033072982",
          status: "active"
        },
        {
          firstName: "Chakrika",
          lastName: "Joyanto",
          id: "100003",
          phone: "4033072210",
          status: "active"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.student-list-wrap {
  max-width: 1440px;
  margin:0 auto;

  .page-title {
    padding: 50px 50px 20px;
  }

  .page-actions {
    padding: 10px 50px 15px;
    display: flex;
    justify-content: space-between;

    .ation-left {
      .show-students {
        display: flex;
        align-items: center;

        .student-key {
          @include fontStyle(14px, 400, 20px);
          margin-right: 10px;
        }
        .student-qty {
          display: flex;
          span {
            @include size(36px);
            background-color: #fff;
            border: 1px solid $gray-shallow;
            @include flexCenter;
            cursor: pointer;

            &:nth-child(n) {
              margin-left: -1px;
            }
            &.active {
              background-color: $primary;
              color: #fff;
              border: 1px solid $primary;
            }
          }
        }
      }
    }
    .ation-right {
      button {
        height: 45px;
        padding: 0 25px;
        background-color: $primary;
        border: none;
        color: #fff;
        letter-spacing: 1px;
        display: flex;
        justify-content: center;
        border-radius: 4px;
        font-size: 15px;

        ion-icon {
          font-size: 18px;
          margin-right: 8px;
        }
      }
    }
  }
  .student-zone {
    width: 100%;
    background-color: #fff;
    display: flex;

    .student-board {
      border: 1px solid $bluegray-shallow;
      width: 33.333%;
      &:nth-child(n) {
        margin-left: -1px;
      }
      .zone-head {
        @include size(100%, 80px);
        border-bottom: 1px solid $bluegray-shallow;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        box-sizing: border-box;
        margin-bottom: 30px;

        .zone-head-left {
          span {
            @include fontStyle(18px, 500, 22px);
            color: $gray-mind;
            &.active {
              &:before {
                background-color: $green;
              }
            }
            &.delinquent {
              &:before {
                background-color: $yellow;
              }
            }
            &.dropped {
              &:before {
                background-color: $red;
              }
            }

            &:before {
              display: inline-block;
              content: "";
              @include size(10px);
              border-radius: 50%;
              margin-right: 12px;
            }
          }
        }
        .zone-head-right {
          color: $gray-light;
          @include fontStyle(15px, 300, 21px);
          display: flex;
          align-items: center;
          .arrows {
            margin-left: 20px;

            ion-icon {
              font-size: 30px;
              color: $gray-shallow;
              cursor: pointer;

              &.active {
                color: $gray-dark;
              }
            }
          }
        }
      }
      .zone-body {
        padding: 0 20px 80px;

        .student-card {
          margin: 0 auto;
          max-width: 400px;
          min-height: 90px;
          border-radius: 8px;
          border: 1px solid #e2eaec;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          margin-bottom: 12px;

          &:after {
            content: "";
            display: block;
            @include size(8px, 100px);
            background-color: $green;
            position: absolute;
            top: 0;
            right: 0;
          }

          .student-avatar {
            @include size(52px);
            @include flexCenter;
            border-radius: 50%;
            color: $avatar-01;
            background-color: rgba($avatar-01, 0.1);
            margin: 0 25px;
            text-transform: uppercase;
          }
          .student-info {
            .student-name {
              @include fontStyle(18px, 600, 25px);
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
        }
      }
    }
  }
}
</style>