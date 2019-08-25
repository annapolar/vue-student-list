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
        <button @click="openDialog(true)">
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
            {{activeShowPage * pageSize}} - {{(activeShowPage + 1) * pageSize}} of {{_activeStudent.length}}
            <div class="arrows">
              <ion-icon name="arrow-dropleft" @click="activeShowPage > 0 && prev('activeShowPage')"></ion-icon>
              <ion-icon
                name="arrow-dropright"
                @click="activeShowPage < maxActiveShowPage && next('activeShowPage')"
              ></ion-icon>
            </div>
          </div>
        </div>
        <div class="zone-body">
          <draggable
            class="dragArea list-group"
            :list="activeStudent"
            :clone="clone"
            :group="{ name: 'people', pull: pullFunction }"
            @start="start"
            @add="(e) => onAdd(e, 'Active')"
          >
            <StudentCard
              v-for="student in activeStudent"
              :key="student.id"
              :id="student.id"
              :firstName="student.firstName"
              :lastName="student.lastName"
              :studentId="student.studentId"
              :phone="student.phoneNumber"
              :status="student.status"
              :initial="student.firstName.charAt(0)"
              @editInfo="editStudent(student)"
            />
          </draggable>
        </div>
      </div>
      <div class="student-board">
        <div class="zone-head">
          <div class="zone-head-left">
            <span class="delinquent">Delinquent</span>
          </div>
          <div class="zone-head-right">
            {{delinquentShowPage * pageSize}} - {{(delinquentShowPage + 1) * pageSize}} of {{_delinquentStudent.length}}
            <div class="arrows">
              <ion-icon
                name="arrow-dropleft"
                @click="delinquentShowPage > 0 && prev('delinquentShowPage')"
              ></ion-icon>
              <ion-icon
                name="arrow-dropright"
                @click="delinquentShowPage < maxDelinquentShowPage && next('delinquentShowPage')"
              ></ion-icon>
            </div>
          </div>
        </div>
        <div class="zone-body">
          <draggable
            class="dragArea list-group"
            :list="delinquentStudent"
            :clone="clone"
            :group="{ name: 'people', pull: pullFunction }"
            @start="start"
            @add="(e) => onAdd(e, 'Delinquent')"
          >
            <StudentCard
              v-for="student in delinquentStudent"
              :key="student.id"
              :id="student.id"
              :firstName="student.firstName"
              :lastName="student.lastName"
              :studentId="student.studentId"
              :phone="student.phoneNumber"
              :status="student.status"
              :initial="student.firstName.charAt(0)"
              @editInfo="editStudent(student)"
            />
          </draggable>
        </div>
      </div>
      <div class="student-board">
        <div class="zone-head">
          <div class="zone-head-left">
            <span class="dropped">Dropped</span>
          </div>
          <div class="zone-head-right">
            {{droppedShowPage * pageSize}} - {{(droppedShowPage + 1) * pageSize}} of {{_droppedStudent.length}}
            <div class="arrows">
              <ion-icon name="arrow-dropleft" @click="droppedShowPage > 0 && prev('droppedShowPage')"></ion-icon>
              <ion-icon
                name="arrow-dropright"
                @click="droppedShowPage < maxDroppedShowPage && next('droppedShowPage')"
              ></ion-icon>
            </div>
          </div>
        </div>
        <div class="zone-body">
          <draggable
            class="dragArea list-group"
            :list="droppedStudent"
            :clone="clone"
            :group="{ name: 'people', pull: pullFunction }"
            @add="(e) => onAdd(e, 'Dropped')"
            @start="start"
          >
            <StudentCard
              v-for="student in droppedStudent"
              :key="student.id"
              :id="student.id"
              :firstName="student.firstName"
              :lastName="student.lastName"
              :studentId="student.studentId"
              :phone="student.phoneNumber"
              :status="student.status"
              :initial="student.firstName.charAt(0)"
              @editInfo="editStudent(student)"
            />
          </draggable>
        </div>
      </div>
    </div>
    <!-- ============== Dialog (Add & Edit Student)  ================ -->
    <Dialog
      v-if="showModal"
      v-bind="dialogScheme"
      @closeModal="showModal = false"
      @confirmModal="updateStudent"
    >
      <div slot="body">
        <div class="dialog-wrap">
          <div class="dialog-title">Student Information</div>
          <div class="form-row">
            <div class="form-section">
              <label for="first_name">First Name</label>
              <input type="text" id="first_name" v-model="tempStudent.firstName" />
            </div>
            <div class="form-section">
              <label for="last_name">Last Name</label>
              <input type="text" id="last_name" v-model="tempStudent.lastName" />
            </div>
          </div>
          <div class="form-section">
            <label for="student_id">Student ID</label>
            <input
              type="text"
              id="student_id"
              v-model.number="tempStudent.studentId"
              placeholder="100001"
            />
          </div>

          <div class="form-section">
            <label for="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              v-model.number="tempStudent.phoneNumber"
              placeholder="403123456"
            />
          </div>
          <label for="status">Status</label>
          <select id="status" v-model="tempStudent.status">
            <option value="null" disabled>Please select status</option>
            <option value="Active">Active</option>
            <option value="Delinquent">Delinquent</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import StudentCard from "../components/StudentCard.vue";
import Dialog from "../components/Dialog.vue";
import db from "@/database";
import draggable from "vuedraggable";

export default {
  components: { StudentCard, Dialog, draggable },
  data() {
    return {
      showModal: false,
      dialogScheme: {
        maxWidth: 700
      },
      tempStudent: {},
      students: [],
      isNew: false,
      studentDataID: "",
      controlOnStart: true,
      pageSize: 10,
      activeShowPage: 0,
      delinquentShowPage: 0,
      droppedShowPage: 0
    };
  },
  computed: {
    // ---- active students ----
    _activeStudent() {
      return this.students.filter(student => student.status == "Active");
    },
    activeStudent() {
      const start = this.activeShowPage * this.pageSize;
      return this._activeStudent.slice(start, start + this.pageSize);
    },
    maxActiveShowPage() {
      return Math.floor(this._activeStudent.length / this.pageSize);
    },

    // ---- delinquent students ----
    _delinquentStudent() {
      return this.students.filter(student => student.status == "Delinquent");
    },
    delinquentStudent() {
      const start = this.delinquentShowPage * this.pageSize;
      return this._delinquentStudent.slice(start, start + this.pageSize);
    },
    maxDelinquentShowPage() {
      return Math.floor(this._delinquentStudent.length / this.pageSize);
    },

    // ---- dropped students ----
    _droppedStudent() {
      return this.students.filter(student => student.status == "Dropped");
    },
    droppedStudent() {
      const start = this.droppedShowPage * this.pageSize;
      return this._droppedStudent.slice(start, start + this.pageSize);
    },
    maxDroppedShowPage() {
      return Math.floor(this._droppedStudent.length / this.pageSize);
    }
  },
  methods: {
    openDialog(isNew, data) {
      if (isNew) {
        this.tempStudent = {};
        this.isNew = true;
      } else {
        this.tempStudent = Object.assign({}, data);
        this.isNew = false;
        this.studentDataID = data.id;
      }
      this.showModal = true;
    },
    updateStudent() {
      this.showModal = false;
      if (this.isNew) {
        db.collection("students")
          .add(this.tempStudent)
          .then(() => {
            this.tempStudent = {};
          })
          .catch(() => {});
      } else {
        let student_Object = db.collection("students").doc(this.studentDataID);
        const ID = student_Object.id;
        db.collection("students")
          .doc(ID)
          .update(this.tempStudent)
          .then(() => {
            this.tempStudent = {};
          })
          .catch(() => {});
      }
    },
    newUpdateStudnent(id, student) {
      db.collection("students")
        .doc(id)
        .update(student)
        .catch(() => {});
    },
    editStudent(student) {
      this.openDialog(false, student);
    },

    prev(category) {
      console.log(category);
      this[category] -= 1;
    },

    next(category) {
      console.log(category);
      this[category] += 1;
    },

    // ----- drag & drop -----
    clone({ name }) {
      let idGlobal = 8;
      return { name, id: idGlobal++ };
    },
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    },
    onAdd(e, status) {
      // console.log(e);
      // console.log("onAdd", e.item.id, status);
      const student = this.students.find(student => student.id === e.item.id);

      if (student) {
        const updatedStudent = Object.assign({}, student, { status });
        this.newUpdateStudnent(student.id, updatedStudent);
      }
    }
  },
  firestore() {
    return {
      students: db.collection("students")
    };
  }
};
</script>

<style lang="scss" scoped>
.student-list-wrap {
  max-width: 1440px;
  margin: 0 auto;

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
            transition: 0.5s;

            &:hover {
              background-color: $primary-light;
              border: 1px solid $primary-light;
              color: #fff;
            }

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
        padding: 0 18px;
        background-color: $primary;
        border: none;
        color: #fff;
        letter-spacing: 1px;
        display: flex;
        justify-content: center;
        border-radius: 2px;
        font-size: 15px;
        transition: 0.5s;

        &:hover {
          background-color: $primary-light;
        }

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
            @include fontStyle(16px, 500, 22px);
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
      }
    }
  }
  .dialog-wrap {
    .dialog-title {
      @include fontStyle(24px, 400, 34px);
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>
