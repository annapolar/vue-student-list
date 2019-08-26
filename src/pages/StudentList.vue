<template>
  <div class="student-list-wrap">
    <div class="page-head-wrap">
      <div class="page-head">
        <div class="page-title">Student List</div>
        <div class="page-actions">
          <div class="student-qty">
            Show
            <span :class="pageSize === 10 ? 'active':''" @click="tenItems">10</span>
            <span :class="pageSize === 20 ? 'active':''" @click="twentyItems">20</span>
          </div>
          <button @click="openDialog(true)">
            <ion-icon name="add"></ion-icon>Add Student
          </button>
        </div>
      </div>
    </div>
    <div class="student-zone">
      <div
        class="student-board"
        @click="boardOpen = 'activeStudent'"
        :class="boardOpen === 'activeStudent'?'active':''"
      >
        <div class="zone-head">
          <div class="zone-head-left">
            <span>Active</span>
          </div>
          <div class="zone-head-right">
            {{currentActivePage * pageSize + 1 }} - {{ lastActiveIndex }} of {{_activeStudent.length}}
            <div class="arrows">
              <ion-icon
                name="arrow-dropleft"
                @click="currentActivePage > 0 && prev('currentActivePage')"
              ></ion-icon>
              <ion-icon
                name="arrow-dropright"
                @click="currentActivePage < maxActivePage && next('currentActivePage')"
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
      <div
        class="student-board"
        @click="boardOpen = 'delinquentStudent'"
        :class="boardOpen === 'delinquentStudent'?'active':''"
      >
        <div class="zone-head">
          <div class="zone-head-left">
            <span>Delinquent</span>
          </div>
          <div class="zone-head-right">
            {{currentDelinquentPage * pageSize + 1 }} - {{lastDelinquentIndex}} of {{_delinquentStudent.length}}
            <div class="arrows">
              <ion-icon
                name="arrow-dropleft"
                @click="currentDelinquentPage > 0 && prev('currentDelinquentPage')"
              ></ion-icon>
              <ion-icon
                name="arrow-dropright"
                @click="currentDelinquentPage < maxDelinquentPage && next('currentDelinquentPage')"
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
      <div
        class="student-board"
        @click="boardOpen = 'droppedStudent'"
        :class="boardOpen === 'droppedStudent'?'active':''"
      >
        <div class="zone-head">
          <div class="zone-head-left">
            <span>Dropped</span>
          </div>
          <div class="zone-head-right">
            {{currentDroppedPage * pageSize + 1 }} - {{lastDroppedIndex}} of {{_droppedStudent.length}}
            <div class="arrows">
              <ion-icon
                name="arrow-dropleft"
                @click="currentDroppedPage > 0 && prev('currentDroppedPage')"
              ></ion-icon>
              <ion-icon
                name="arrow-dropright"
                @click="currentDroppedPage < maxDroppedPage && next('currentDroppedPage')"
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
      currentActivePage: 0,
      currentDelinquentPage: 0,
      currentDroppedPage: 0,
      boardOpen: "activeStudent"
    };
  },
  computed: {
    // ---- active students ----
    _activeStudent() {
      return this.students.filter(student => student.status == "Active");
    },
    activeStudent() {
      const start = this.currentActivePage * this.pageSize;
      return this._activeStudent.slice(start, start + this.pageSize);
    },
    maxActivePage() {
      return Math.floor(this._activeStudent.length / this.pageSize);
    },
    lastActiveIndex() {
      if (this.currentActivePage >= this.maxActivePage) {
        return this._activeStudent.length;
      } else {
        return (this.currentActivePage + 1) * this.pageSize;
      }
    },

    // ---- delinquent students ----
    _delinquentStudent() {
      return this.students.filter(student => student.status == "Delinquent");
    },
    delinquentStudent() {
      const start = this.currentDelinquentPage * this.pageSize;
      return this._delinquentStudent.slice(start, start + this.pageSize);
    },
    maxDelinquentPage() {
      return Math.floor(this._delinquentStudent.length / this.pageSize);
    },
    lastDelinquentIndex() {
      if (this.currentDelinquentPage >= this.maxDelinquentPage) {
        return this._delinquentStudent.length;
      } else {
        return (this.currentDelinquentPage + 1) * this.pageSize;
      }
    },

    // ---- dropped students ----
    _droppedStudent() {
      return this.students.filter(student => student.status == "Dropped");
    },
    droppedStudent() {
      const start = this.currentDroppedPage * this.pageSize;
      return this._droppedStudent.slice(start, start + this.pageSize);
    },
    maxDroppedPage() {
      return Math.floor(this._droppedStudent.length / this.pageSize);
    },
    lastDroppedIndex() {
      if (this.currentDroppedPage >= this.maxDroppedPage) {
        return this._droppedStudent.length;
      } else {
        return (this.currentDroppedPage + 1) * this.pageSize;
      }
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
    },

    // ----- 10 or 20 items per page -----
    twentyItems() {
      this.pageSize = 20;
      this.currentActivePage = 0;
      this.currentDelinquentPage = 0;
      this.currentDroppedPage = 0;
    },
    tenItems() {
      this.pageSize = 10;
      this.currentActivePage = 0;
      this.currentDelinquentPage = 0;
      this.currentDroppedPage = 0;
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
  margin: 0 auto;
  padding-bottom: 80px;

  .page-head-wrap {
    background-color: $primary;
    width: 100%;
    min-height: 280px;
    padding: 0 30px;
    box-sizing: border-box;

    .page-head {
      max-width: 1275px;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      padding-top: 58px;

      .page-title {
        @include fontStyle(30px, 400, 45px);
        color: #fff;
        letter-spacing: 0.5px;
      }
      .page-actions {
        display: flex;

        .student-qty {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #fff;
          margin-right: 30px;

          span {
            @include size(35px);
            @include flexCenter;
            font-weight: 500;
            cursor: pointer;
            transition: 0.5s;
            margin-left: 8px;
            border-radius: 3px;

            &:hover {
              box-shadow: 0 0 0 1px #fff;
            }
            &.active {
              box-shadow: 0 0 0 1px #fff;
            }
          }
        }
        button {
          height: 45px;
          padding: 0 18px;
          background-color: $secondary;
          border: none;
          color: #fff;
          letter-spacing: 1px;
          display: flex;
          justify-content: center;
          border-radius: 4px;
          font-size: 15px;
          transition: 0.5s;

          &:hover {
            background-color: $secondary-light;
          }

          ion-icon {
            font-size: 18px;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .student-zone {
    width: 100%;
    max-width: 1275px;
    margin: 0 auto;
    display: flex;
    margin-top: -120px;
    overflow: auto;

    .student-board {
      border: 1px solid $bluegray-shallow;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(#8494b2, 0.4);
      margin-right: 12px;
      padding: 20px 30px 60px;
      box-sizing: border-box;
      overflow: hidden;
      cursor: pointer;
      min-width: 120px;
      max-width: 120px;
      transition: 1s;

      &.active {
        min-width: calc(100% - 264px);
      }

      &:last-child {
        margin-right: 0;
      }

      .zone-head {
        @include size(100%, 90px);
        min-width: 700px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .zone-head-left {
          span {
            @include fontStyle(20px, 500, 28px);
            color: $gray-mind;
          }
        }
        .zone-head-right {
          color: $gray-mind;
          @include fontStyle(15px, 300, 21px);
          display: flex;
          align-items: center;
          .arrows {
            margin-left: 20px;

            ion-icon {
              font-size: 30px;
              color: $gray-mind;
              cursor: pointer;

              &.active {
                color: $gray-dark;
              }
            }
          }
        }
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
@media only screen and (max-width: 1080px) {
  .student-list-wrap {
    .student-zone {
      .student-board {
        min-width: 80px;
        max-width: 80px;
        &.active {
          min-width: 860px;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .student-list-wrap {
    .page-head-wrap {
      min-height: 220px;

      .page-head {
        display: block;
        padding-top: 40px;

        .page-title {
          @include fontStyle(26px, 400, 30px);
          margin-bottom: 30px;
        }
        .page-actions {
          justify-content: flex-end;

          .student-qty {
            font-size: 13px;
            margin-right: 15px;

            span {
              @include size(30px);
              font-weight: 400;
              margin-left: 4px;
            }
          }
          button {
            height: 40px;
            padding: 0 12px;
            font-size: 13px;
          }
        }
      }
    }
    .student-zone {
      margin-top: -60px;
    }
  }
}
</style>
