<template>
  <section class="add_wrap" id="add_wrap">
    <article class="inner_wrap">
      <p class="add_title title">タイトル</p>
      <p class="input">
        <input
          type="text"
          placeholder="タイトルを入れてください"
          v-model="addlist[0].title"
        />
      </p>
      <p class="add_title size">フォントサイズ</p>
      <p class="input">
        <input type="number" placeholder="16" v-model="addlist[0].fontsize" />
        px
      </p>
      <p class="add_title type">表示タイプ(text or textarea)</p>
      <p class="input">
        <select name="" id="" v-model="addlist[0].type">
          <option value="" selected>表示タイプを選択</option>
          <option value="text">text</option>
          <option value="textarea">textarea</option>
        </select>
      </p>
      <p class="add_title sort">表示箇所(選択ヶ所の下)</p>
      <p class="input">
        <select name="" id="" v-model="addlist[0].id">
          <option value="">表示箇所を選択</option>
          <option
            :value="sorts.id"
            v-for="(sorts, index) in inputlist"
            :key="index"
          >
            {{ sorts.title }}
          </option>
        </select>
      </p>
      <button class="addarray" @click="addarray()">追加する</button>
    </article>
  </section>
  <section
    class="single pc_wrap"
    v-for="(il, index) in inputlist"
    v-bind:key="il.id"
  >
    <button class="remove" @click="remove(index)">×</button>
    <h2 class="title">{{ il.title }}</h2>
    <div class="write-area">
      <p
        :style="{
          color: il.color,
          fontSize: il.fontsize + 'px',
          fontWeight: il.weight,
        }"
        :class="il.family"
      >
        {{ il.input }}
      </p>
    </div>
    <article class="input_wrap">
      <div class="text-input">
        <template v-if="il.type == 'text'">
          <input
            type="text"
            v-model="il.input"
            placeholder="テキストを入力してください"
            name=""
            id=""
          />
        </template>
        <template v-else>
          <textarea
            name=""
            v-model="il.input"
            id=""
            rows="5"
            placeholder="テキストを入力してください"
          ></textarea>
        </template>
      </div>
      <div class="fontsize-input">
        <input type="number" v-model="il.fontsize" /> px
      </div>
      <div class="color-input">
        <input type="color" v-model="il.color" />
      </div>
      <div class="family-input">
        <select name="" id="" v-model="il.family">
          <option selected value="">フォントを選んでください</option>
          <option
            v-bind:value="fonts.class"
            v-for="fonts in il.familys"
            v-bind:key="fonts"
          >
            {{ fonts.name }}
          </option>
        </select>
      </div>
      <div class="weight-input">
        <select name="" id="" v-model="il.weight">
          <option selected value="">太さを選んでください</option>
          <option
            v-bind:value="weight"
            v-for="weight in il.weights"
            v-bind:key="weight"
          >
            {{ weight }}
          </option>
        </select>
      </div>
    </article>
  </section>
  <section class="view_wrap">
    <article class="select_view">
      <div v-for="(check, index) in inputlist" :key="check" class="c-single">
        <input
          @change="arraychange"
          v-model="checklist"
          type="checkbox"
          :value="check.id"
          :id="'c' + index"
        />
        <label :for="'c' + index">{{ check.title }}</label>
      </div>
    </article>
    <article class="text_view">
      <p
        :style="{
          color: view.color,
          fontSize: view.fontsize + 'px',
          fontWeight: view.weight,
        }"
        :class="view.family"
        v-for="view in viewlist"
        :key="view"
      >
        {{ view.input }}
      </p>
    </article>
  </section>
  <button
    class="add_toggle"
    id="add_toggle"
    @click="
      addwrap = !addwrap;
      addclass();
    "
  >
    +
  </button>
</template>

<script>
import inputlists from "../assets/js/data";
import addlists from "../assets/js/add";
import familysArray from "../assets/js/fontfamily";
import weightsArray from "../assets/js/weight";
//import draggable from "vuedraggable";

export default {
  name: "ViewFonts",
  data() {
    return {
      inputlist: inputlists,
      checklist: [],
      viewlist: [],
      addlist: [],
      addwrap: false,
    };
  },
  created: function () {
    this.inputlist.forEach((element) => {
      element.familys = familysArray;
      element.weights = weightsArray;
    });
    this.addlist.push(addlists);
  },
  methods: {
    fw: function () {
      this.inputlist.forEach((element) => {
        element.familys = familysArray;
        element.weights = weightsArray;
      });
    },
    arraychange: function () {
      this.viewlist.splice(0, this.viewlist.length);
      this.checklist.forEach((element) => {
        this.viewlist.splice(
          this.inputlist[element].id,
          0,
          this.inputlist[element]
        );
      });
    },
    remove: function (index) {
      this.checklist.splice(0, this.checklist.length);
      this.viewlist.splice(0, this.viewlist.length);
      this.inputlist.splice(index, 1);
    },
    addclass: function () {
      const togglebutton = document.getElementById("add_toggle");
      const addwrap = document.getElementById("add_wrap");
      togglebutton.classList.toggle("active");
      addwrap.classList.toggle("active");
    },
    addarray: function () {
      var al = {
        id: "",
        title: "",
        input: "テキストを入力してください",
        type: "",
        fontsize: "",
        color: "",
        family: "",
        familys: "",
        weight: "",
        weights: "",
      };
      const insertNum = this.addlist[0].id + 1;
      al.id = insertNum;
      al.title = this.addlist[0].title;
      al.fontsize = this.addlist[0].fontsize;
      al.type = this.addlist[0].type;
      this.inputlist.splice(insertNum, 0, al);
      var idnum = 0;
      this.inputlist.forEach((element) => {
        element.id = idnum;
        idnum++;
      });
      this.addclass();
      this.fw();
      this.addlist[0].id = "";
      this.addlist[0].fontsize = "";
      this.addlist[0].title = "";
      this.addlist[0].type = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
