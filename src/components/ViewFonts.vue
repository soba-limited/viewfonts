<template>
  <section class="add_wrap">
    <p class="test">test</p>
  </section>
  <section
    class="single pc_wrap"
    :class="il.class"
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
          :value="index"
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
  <button class="add_toggle">+</button>
</template>

<script>
import inputlists from "../assets/js/data";
import familysArray from "../assets/js/fontfamily";
import weightsArray from "../assets/js/weight";
export default {
  name: "ViewFonts",
  data() {
    return {
      inputlist: inputlists,
      checklist: [],
      viewlist: [],
      addwrap: false,
    };
  },
  mounted: function () {
    this.inputlist.forEach((object, index) => {
      this.inputlist[index].familys = familysArray;
      this.inputlist[index].weights = weightsArray;
    });
  },
  methods: {
    arraychange: function () {
      this.viewlist = [];
      this.checklist.forEach((element) => {
        this.viewlist.push(this.inputlist[element]);
      });
    },
    remove: function (index) {
      console.log(this.inputlist[index]);
      this.inputlist.splice(index, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
