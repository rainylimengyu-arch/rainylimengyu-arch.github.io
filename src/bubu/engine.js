// Generated from the user-authorized BUBU snapshot. Rebuild: node scripts/build-bubu-engine.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// resources/bubu-source/data/intake-questions.js
var require_intake_questions = __commonJS({
  "resources/bubu-source/data/intake-questions.js"(exports, module) {
    "use strict";
    var options = (pairs) => pairs.map(([id, label]) => ({ id, label }));
    var choices = (small, middle, large) => options([
      ["zero", "\u57FA\u672C\u6CA1\u6709"],
      ["small", small],
      ["medium", middle],
      ["large", large],
      ["unknown", "\u8BF4\u4E0D\u6E05"]
    ]);
    var field = (id, title, pairs, type = "single", helper = "") => ({
      id,
      title,
      type,
      required: true,
      helper,
      options: options(pairs),
      exclusiveIds: ["none", "unknown"]
    });
    var INTAKE_QUESTIONS = {
      daily_portions: {
        id: "daily_portions",
        type: "matrix",
        required: true,
        eyebrow: "\u6BCF\u5929\u5403\u591A\u5C11",
        title: "\u628A\u6700\u8FD1\u4E00\u5468\u5E73\u5747\u5230\u6BCF\u5929\uFF0C\u5927\u7EA6\u5403\u591A\u5C11\uFF1F",
        helper: "\u5305\u542B\u6CA1\u5403\u7684\u65E5\u5B50\uFF1B\u4EFD\u91CF\u4E0D\u5FC5\u7CBE\u786E\u3002\u690D\u7269\u996E\u54C1\u3001\u8C46\u5236\u54C1\u7684\u5F3A\u5316\u60C5\u51B5\u4E0B\u4E00\u6B65\u518D\u95EE\u3002",
        rows: [
          { id: "dairy", label: "\u5976\u3001\u9178\u5976\u6216\u690D\u7269\u996E\u54C1", description: "\u4E00\u76D2\u901A\u5E38\u7EA6 250 mL\uFF1B\u5148\u5408\u8BA1\u996E\u7528\u91CF\u3002", choices: choices("\u4E0D\u8DB3 250 mL", "250\u2013500 mL", "\u8D85\u8FC7 500 mL") },
          { id: "tofu", label: "\u8C46\u8150\u3001\u8C46\u5E72\u7B49\u8C46\u5236\u54C1", description: "\u7EA6\u534A\u76D2\u5AE9\u8C46\u8150\u5E38\u4E3A 150 g\uFF0C\u4EE5\u5305\u88C5\u91CD\u91CF\u4E3A\u51C6\u3002", choices: choices("\u4E0D\u8DB3 100 g", "100\u2013200 g", "\u8D85\u8FC7 200 g") },
          { id: "beans", label: "\u716E\u719F\u7684\u6742\u8C46", description: "\u7EA2\u8C46\u3001\u6241\u8C46\u3001\u9E70\u5634\u8C46\u7B49\uFF1B\u4E0D\u91CD\u590D\u8BA1\u7B97\u8C46\u8150\u3002", choices: choices("\u4E0D\u8DB3\u534A\u7897", "\u534A\u7897\u81F3\u4E00\u7897", "\u8D85\u8FC7\u4E00\u7897") },
          { id: "vegetables", label: "\u852C\u83DC", description: "\u6309\u751F\u91CD\u4F30\u8BA1\uFF1B\u5916\u5356\u91CC\u5C11\u91CF\u914D\u83DC\u4E5F\u7B97\uFF0C\u4F46\u4E0D\u8981\u7B97\u4F5C\u4E00\u6574\u4EFD\u3002", choices: choices("\u4E0D\u8DB3 300 g", "300\u2013500 g", "\u8D85\u8FC7 500 g") },
          { id: "fruit", label: "\u65B0\u9C9C\u6C34\u679C", description: "\u4E0D\u542B\u679C\u6C41\uFF1B\u4E00\u4E2A\u4E2D\u7B49\u82F9\u679C\u53EF\u98DF\u90E8\u7EA6 150\u2013200 g\u3002", choices: choices("\u4E0D\u8DB3 200 g", "200\u2013350 g", "\u8D85\u8FC7 350 g") },
          { id: "whole_grains", label: "\u5168\u8C37\u6742\u7CAE", description: "\u71D5\u9EA6\u3001\u7CD9\u7C73\u3001\u5168\u9EA6\u7B49\u5360\u4E3B\u98DF\u7684\u6BD4\u4F8B\uFF1B\u4E0D\u628A\u571F\u8C46\u7B97\u5728\u8FD9\u91CC\u3002", choices: choices("\u4E0D\u5230\u4E3B\u98DF\u7684 1/3", "\u4E3B\u98DF\u7684 1/3\u20131/2", "\u8D85\u8FC7\u4E3B\u98DF\u7684 1/2") },
          { id: "nuts", label: "\u575A\u679C\u3001\u79CD\u5B50", description: "\u53BB\u58F3\u540E\u7684\u91CD\u91CF\uFF1B\u4E00\u5C0F\u628A\u7EA6 10 g\u3002", choices: choices("\u4E0D\u8DB3 10 g", "10\u201320 g", "\u8D85\u8FC7 20 g") },
          { id: "meat_fish", label: "\u8089\u3001\u79BD\u3001\u9C7C\u3001\u867E\u3001\u8D1D\u7C7B\u5408\u8BA1", description: "\u6309\u53EF\u98DF\u90E8\u5206\u751F\u91CD\u7C97\u4F30\uFF1B\u624B\u638C\u5927\u5C0F\u8584\u7247\u7EA6 50\u2013100 g\u3002", choices: choices("\u4E0D\u8DB3 100 g", "100\u2013200 g", "\u8D85\u8FC7 200 g") },
          { id: "eggs", label: "\u9E21\u86CB\u6216\u7B49\u91CF\u5176\u4ED6\u86CB\u7C7B", choices: choices("\u4E0D\u8DB3 1 \u4E2A", "\u7EA6 1 \u4E2A", "\u8D85\u8FC7 1 \u4E2A") }
        ]
      },
      food_sources: {
        id: "food_sources",
        type: "fields",
        required: true,
        eyebrow: "\u98DF\u7269\u91CC\u7684\u5173\u952E\u533A\u522B",
        title: "\u518D\u6838\u5BF9\u51E0\u79CD\u5BB9\u6613\u7B97\u9519\u7684\u6765\u6E90",
        helper: "\u8FD9\u4E9B\u5DEE\u522B\u4F1A\u76F4\u63A5\u5F71\u54CD\u9499\u3001\u7898\u3001\u7EF4\u751F\u7D20 D\u3001E \u7B49\u9879\u76EE\u7684\u5224\u65AD\u3002",
        fields: [
          field("calcium_drink", "\u524D\u9762\u559D\u7684\u4E3B\u8981\u662F\u4EC0\u4E48\uFF1F", [
            ["dairy", "\u725B\u5976\u3001\u9178\u5976\u7B49\u4E73\u5236\u54C1"],
            ["fortified", "\u660E\u786E\u6807\u6CE8\u5F3A\u5316\u9499\u7684\u690D\u7269\u996E\u54C1"],
            ["unfortified", "\u672A\u5F3A\u5316\u9499\u7684\u8C46\u6D46\u3001\u71D5\u9EA6\u996E\u7B49"],
            ["none", "\u57FA\u672C\u4E0D\u559D"],
            ["unknown", "\u4E0D\u6E05\u695A\u662F\u5426\u5F3A\u5316"]
          ]),
          field("calcium_tofu", "\u5E38\u5403\u7684\u8C46\u8150\u662F\u54EA\u79CD\uFF1F", [
            ["calcium_set", "\u6807\u7B7E\u5199\u6709\u786B\u9178\u9499 / \u77F3\u818F\u7B49\u542B\u9499\u51DD\u56FA\u5242"],
            ["other", "\u5185\u916F\u8C46\u8150\u6216\u5176\u4ED6\u7C7B\u578B"],
            ["none", "\u57FA\u672C\u4E0D\u5403"],
            ["unknown", "\u4E0D\u77E5\u9053\u51DD\u56FA\u5242\u7C7B\u578B"]
          ]),
          field("fortified", "\u6709\u89C4\u5F8B\u5403\u8FD9\u4E9B\u5F3A\u5316\u98DF\u54C1\u5417\uFF1F", [
            ["vitamin_d", "\u660E\u786E\u5F3A\u5316\u7EF4\u751F\u7D20 D"],
            ["b12", "\u660E\u786E\u5F3A\u5316 B12"],
            ["other", "\u5176\u4ED6\u5F3A\u5316\u8425\u517B\u7D20"],
            ["none", "\u6CA1\u6709"],
            ["unknown", "\u6CA1\u770B\u8FC7\u6807\u7B7E"]
          ], "multi", "\u53EA\u7B97\u6807\u7B7E\u660E\u786E\u6807\u6CE8\u7684\uFF0C\u4E0D\u9ED8\u8BA4\u6240\u6709\u725B\u5976\u90FD\u5F3A\u5316\u7EF4\u751F\u7D20 D\u3002"),
          field("salt", "\u65E5\u5E38\u505A\u996D\u4E3B\u8981\u7528\u4EC0\u4E48\u76D0\uFF1F", [
            ["iodized", "\u52A0\u7898\u76D0"],
            ["non_iodized", "\u672A\u52A0\u7898\u76D0"],
            ["potassium_salt", "\u542B\u6C2F\u5316\u94BE\u7684\u4F4E\u94A0\u76D0"],
            ["unknown", "\u4E3B\u8981\u5728\u5916\u5403 / \u4E0D\u6E05\u695A"]
          ]),
          field("oil", "\u65E5\u5E38\u70F9\u8C03\u6CB9\u4E3B\u8981\u662F\u4EC0\u4E48\uFF1F", [
            ["plant", "\u82B1\u751F\u3001\u83DC\u7C7D\u3001\u8475\u82B1\u7C7D\u3001\u5927\u8C46\u3001\u6A44\u6984\u7B49\u690D\u7269\u6CB9"],
            ["animal_coconut", "\u4E3B\u8981\u662F\u732A\u6CB9\u3001\u9EC4\u6CB9\u6216\u6930\u5B50\u6CB9"],
            ["very_little", "\u957F\u671F\u51E0\u4E4E\u4E0D\u5403\u6CB9\u8102"],
            ["unknown", "\u4E0D\u6E05\u695A"]
          ]),
          field("potato", "\u6700\u8FD1\u4E00\u5468\uFF0C\u571F\u8C46\u3001\u7EA2\u85AF\u7B49\u85AF\u7C7B\u5403\u4E86\u51E0\u5929\uFF1F", [
            ["zero", "0 \u5929"],
            ["one_two", "1\u20132 \u5929"],
            ["three_four", "3\u20134 \u5929"],
            ["five_seven", "5\u20137 \u5929"],
            ["unknown", "\u8BF4\u4E0D\u6E05"]
          ])
        ]
      },
      nutrition_context: {
        id: "nutrition_context",
        type: "fields",
        required: true,
        eyebrow: "\u5F71\u54CD\u8425\u517B\u9700\u8981\u7684\u60C5\u51B5",
        title: "\u8FD9\u4E9B\u60C5\u51B5\u4E5F\u4F1A\u5F71\u54CD\u5173\u6CE8\u987A\u5E8F",
        helper: "\u4E0D\u77E5\u9053\u53EF\u4EE5\u76F4\u8BF4\uFF1B\u4E0D\u4F1A\u628A\u201C\u6CA1\u68C0\u67E5\u8FC7\u201D\u5F53\u4F5C\u201C\u68C0\u67E5\u6B63\u5E38\u201D\u3002",
        fields: [
          field("daylight", "\u6700\u8FD1\u4E00\u4E2A\u6708\uFF0C\u767D\u5929\u6237\u5916\u6D3B\u52A8\u901A\u5E38\u5982\u4F55\uFF1F", [
            ["very_little", "\u6BCF\u5468\u5927\u591A\u53EA\u6709 0\u20131 \u5929\uFF0C\u6216\u4E3B\u8981\u9694\u7740\u73BB\u7483"],
            ["some", "\u6BCF\u5468\u6709\u51E0\u5929\u6237\u5916\u6D3B\u52A8\uFF0C\u4F46\u591A\u906E\u6321 / \u66B4\u9732\u6709\u9650"],
            ["regular", "\u591A\u6570\u5929\u90FD\u6709\u4E00\u5B9A\u6237\u5916\u6D3B\u52A8"],
            ["unknown", "\u53D8\u5316\u5F88\u5927 / \u8BF4\u4E0D\u6E05"]
          ], "single", "\u6237\u5916\u6D3B\u52A8\u4E0D\u80FD\u76F4\u63A5\u6362\u7B97\u6210\u7EF4\u751F\u7D20 D \u5408\u6210\u91CF\uFF1B\u8FD9\u91CC\u4E0D\u8981\u6C42\u523B\u610F\u6652\u4F24\u6216\u505C\u6B62\u9632\u6652\u3002"),
          field("menstrual", "\u76EE\u524D\u662F\u5426\u6709\u6708\u7ECF\u76F8\u5173\u5931\u8840\uFF1F", [
            ["not_applicable", "\u76EE\u524D\u6CA1\u6709\u6708\u7ECF / \u4E0D\u9002\u7528"],
            ["usual", "\u6709\uFF0C\u51FA\u8840\u91CF\u4E0E\u5E73\u65F6\u76F8\u8FD1"],
            ["heavy", "\u7ECF\u91CF\u8F83\u591A\u3001\u7ECF\u671F\u8F83\u957F\uFF0C\u6216\u66FE\u88AB\u63D0\u9192\u5931\u8840\u8F83\u591A"],
            ["unknown", "\u4E0D\u786E\u5B9A / \u4E0D\u60F3\u8BF4\u660E"]
          ]),
          field("labs", "\u8FD1\u4E00\u5E74\u662F\u5426\u88AB\u533B\u751F\u544A\u77E5\u4EE5\u4E0B\u7ED3\u679C\uFF1F", [
            ["d_low", "\u7EF4\u751F\u7D20 D \u504F\u4F4E"],
            ["iron_low", "\u7F3A\u94C1\u6216\u7F3A\u94C1\u6027\u8D2B\u8840"],
            ["b12_low", "\u7EF4\u751F\u7D20 B12 \u504F\u4F4E"],
            ["potassium_abnormal", "\u8840\u94BE\u5F02\u5E38"],
            ["calcium_abnormal", "\u8840\u9499\u5F02\u5E38"],
            ["none", "\u68C0\u67E5\u8FC7\uFF0C\u672A\u88AB\u544A\u77E5\u8FD9\u4E9B\u5F02\u5E38"],
            ["unknown", "\u6CA1\u6709\u76F8\u5173\u68C0\u67E5 / \u4E0D\u6E05\u695A"]
          ], "multi", "\u53EA\u586B\u5199\u5DF2\u6709\u7ED3\u8BBA\uFF0C\u4E0D\u7528\u51ED\u75C7\u72B6\u731C\u6D4B\uFF1B\u8840\u9499\u6B63\u5E38\u4E5F\u4E0D\u7B49\u4E8E\u65E5\u5E38\u9499\u6444\u5165\u8DB3\u591F\u3002"),
          field("restriction", "\u6700\u8FD1\u662F\u5426\u957F\u671F\u660E\u663E\u51CF\u5C11\u8FDB\u98DF\u79CD\u7C7B\u6216\u603B\u91CF\uFF1F", [
            ["no", "\u6CA1\u6709\uFF0C\u98DF\u91CF\u548C\u98DF\u7269\u79CD\u7C7B\u57FA\u672C\u7A33\u5B9A"],
            ["energy", "\u5728\u8282\u98DF\u6216\u7ECF\u5E38\u5403\u5F97\u5F88\u5C11"],
            ["many_foods", "\u6392\u9664\u4E86\u5F88\u591A\u7C7B\u98DF\u7269\uFF0C\u4E14\u5F88\u96BE\u627E\u5230\u66FF\u4EE3"],
            ["unknown", "\u8BF4\u4E0D\u6E05"]
          ])
        ]
      },
      existing_sources: {
        id: "existing_sources",
        type: "multi",
        required: true,
        noneOptionId: "none",
        exclusiveIds: ["none", "unknown"],
        eyebrow: "\u5DF2\u6709\u8425\u517B\u6765\u6E90",
        title: "\u76EE\u524D\u6709\u89C4\u5F8B\u8865\u5145\u54EA\u4E9B\u8425\u517B\u7D20\uFF1F",
        helper: "\u53EA\u4E3A\u907F\u514D\u628A\u5DF2\u6709\u6765\u6E90\u6F0F\u7B97\uFF1B\u672C\u9898\u4E0D\u505A\u91CD\u590D\u7528\u91CF\u68C0\u67E5\uFF0C\u4E5F\u4E0D\u5224\u65AD\u76EE\u524D\u5242\u91CF\u662F\u5426\u8DB3\u591F\u3002\u53EF\u591A\u9009\u3002",
        options: options([
          ["multivitamin", "\u590D\u5408\u7EF4\u751F\u7D20 / \u77FF\u7269\u8D28"],
          ["vitamin_d", "\u7EF4\u751F\u7D20 D"],
          ["calcium", "\u9499"],
          ["magnesium", "\u9541"],
          ["potassium", "\u94BE"],
          ["iron", "\u94C1"],
          ["b12", "B12"],
          ["b_complex", "B \u65CF"],
          ["omega3", "\u9C7C\u6CB9 / \u85FB\u6CB9"],
          ["other", "\u5176\u4ED6"],
          ["none", "\u76EE\u524D\u6CA1\u6709"],
          ["unknown", "\u6709\u5728\u5403\uFF0C\u4F46\u4E0D\u77E5\u9053\u6210\u5206"]
        ])
      },
      health_detail: {
        id: "health_detail",
        type: "fields",
        required: true,
        eyebrow: "\u628A\u6CE8\u610F\u4E8B\u9879\u95EE\u6E05\u695A",
        title: "\u8865\u5145\u4E00\u4E0B\u76F8\u5173\u5065\u5EB7\u4E0E\u7528\u836F\u60C5\u51B5",
        helper: "\u4ECD\u4F1A\u7EE7\u7EED\u5B8C\u6210\u996E\u98DF\u90E8\u5206\u3002\u8FD9\u91CC\u7528\u4E8E\u907F\u5F00\u4E0D\u9002\u5408\u7684\u996E\u98DF\u6216\u8865\u5145\u5EFA\u8BAE\u3002",
        fields: [
          field("conditions", "\u5DF2\u660E\u786E\u7684\u60C5\u51B5\u6709\u54EA\u4E9B\uFF1F", [
            ["kidney", "\u80BE\u529F\u80FD\u5F02\u5E38 / \u6162\u6027\u80BE\u75C5"],
            ["thyroid", "\u7532\u72B6\u817A\u76F8\u5173\u75BE\u75C5"],
            ["liver", "\u809D\u75C5"],
            ["stones", "\u80BE\u7ED3\u77F3\u6216\u9AD8\u9499\u8840\u75C7"],
            ["food_limit", "\u533B\u751F\u8981\u6C42\u9650\u5236\u67D0\u4E9B\u98DF\u7269\u3001\u94BE\u3001\u78F7\u6216\u86CB\u767D\u8D28"],
            ["other", "\u5176\u4ED6\u75BE\u75C5\u6216\u7279\u6B8A\u60C5\u51B5"],
            ["none", "\u6CA1\u6709\u8FD9\u4E9B\u60C5\u51B5"],
            ["unknown", "\u4E0D\u6E05\u695A"]
          ], "multi"),
          field("medicines", "\u6B63\u5728\u4F7F\u7528\u54EA\u4E9B\u7C7B\u578B\u7684\u836F\u7269\uFF1F", [
            ["potassium_affecting", "\u666E\u5229\u7C7B\u3001\u6C99\u5766\u7C7B\u3001\u87BA\u5185\u916F\u7B49\u53EF\u80FD\u5F71\u54CD\u8840\u94BE\u7684\u836F\u7269"],
            ["warfarin", "\u534E\u6CD5\u6797"],
            ["thyroid_medicine", "\u7532\u72B6\u817A\u76F8\u5173\u836F\u7269"],
            ["b12_affecting", "\u4E8C\u7532\u53CC\u80CD\u6216\u957F\u671F\u6291\u9178\u836F"],
            ["retinoids", "\u7EF4 A \u9178\u7C7B\u836F\u7269"],
            ["other", "\u5176\u4ED6\u836F\u7269"],
            ["none", "\u6CA1\u6709\u7528\u836F"],
            ["unknown", "\u4E0D\u77E5\u9053\u836F\u7269\u7C7B\u522B"]
          ], "multi", "\u4E0D\u8BA4\u8BC6\u836F\u7269\u7C7B\u522B\u65F6\u8BF7\u9009\u62E9\u201C\u4E0D\u77E5\u9053\u201D\uFF0C\u4E0D\u8981\u4E3A\u4E86\u5B8C\u6210\u95EE\u5377\u731C\u6D4B\u6216\u505C\u836F\u3002")
        ]
      }
    };
    module.exports = { INTAKE_QUESTIONS };
  }
});

// resources/bubu-source/data/questions.js
var require_questions = __commonJS({
  "resources/bubu-source/data/questions.js"(exports, module) {
    "use strict";
    var { INTAKE_QUESTIONS } = require_intake_questions();
    var QUESTION_IDS = Object.freeze({
      AUDIENCE: "audience",
      SAFETY: "safety",
      PROFILE: "profile",
      SCENES: "scenes",
      DAILY_LOAD: "daily_load",
      GOALS: "goals",
      SLEEP_DETAIL: "sleep_detail",
      IMPACT: "impact",
      DIET_PATTERN: "diet_pattern",
      FOOD_QUICK: "food_quick",
      FOOD_FREQUENCY: "food_frequency",
      TRAINING_DETAIL: "training_detail",
      DAILY_PORTIONS: "daily_portions",
      FOOD_SOURCES: "food_sources",
      NUTRITION_CONTEXT: "nutrition_context",
      EXISTING_SOURCES: "existing_sources",
      HEALTH_DETAIL: "health_detail"
    });
    var OPTION_IDS = Object.freeze({
      NONE: "none",
      ADULT: "adult_18_64",
      SENIOR: "senior_65_plus",
      MINOR: "minor_under_18",
      VEGAN: "vegan",
      RELIABLE_B12: "reliable_b12_source",
      STRENGTH_SCENE: "strength_training",
      ENDURANCE_SCENE: "endurance_training",
      STRENGTH_GOAL: "strength",
      ENDURANCE_GOAL: "endurance",
      COMPREHENSIVE_GOAL: "comprehensive"
    });
    function option(id, label, description, modes) {
      const value = { id, label };
      if (description) value.description = description;
      if (Array.isArray(modes) && modes.length) value.modes = Object.freeze(modes.slice());
      return Object.freeze(value);
    }
    var MODES = Object.freeze({
      quick: Object.freeze({
        id: "quick",
        title: "\u6781\u7B80\u7248",
        timeLabel: "\u7EA6 2 \u5206\u949F",
        estimatedMinutes: 2,
        stepLabel: "5 \u4E2A\u6838\u5FC3\u6B65\u9AA4",
        baseStepCount: 5,
        description: "\u5FEB\u901F\u770B\u751F\u6D3B\u573A\u666F\u4E0E\u5173\u952E\u98DF\u7269\u6765\u6E90\uFF0C\u5F97\u5230\u65B9\u5411\u6027\u8425\u517B\u7C7B\u522B\u3002"
      }),
      detailed: Object.freeze({
        id: "detailed",
        title: "\u8BE6\u7EC6\u7248",
        timeLabel: "\u7EA6 12\u201318 \u5206\u949F",
        estimatedMinutes: Object.freeze([12, 18]),
        stepLabel: "14 \u4E2A\u6838\u5FC3\u6B65\u9AA4\uFF0C\u6309\u60C5\u51B5\u589E\u52A0\u8FFD\u95EE",
        baseStepCount: 14,
        description: "\u9010\u9879\u4E86\u89E3\u98DF\u7269\u4EFD\u91CF\u3001\u7EF4\u751F\u7D20\u4E0E\u77FF\u7269\u8D28\u6765\u6E90\uFF0C\u518D\u7ED3\u5408\u7761\u7720\u3001\u8BAD\u7EC3\u548C\u5065\u5EB7\u60C5\u51B5\u6392\u5217\u91CD\u70B9\u3002"
      })
    });
    var FOOD_FREQUENCY_CHOICES = Object.freeze([
      option("zero", "0 \u5929"),
      option("one_two", "1\u20132 \u5929"),
      option("three_four", "3\u20134 \u5929"),
      option("five_seven", "5\u20137 \u5929"),
      option("unknown", "\u8BF4\u4E0D\u6E05")
    ]);
    var FOOD_ROWS = Object.freeze([
      option("dairy_calcium", "\u5976\u3001\u9178\u5976\u6216\u660E\u786E\u5F3A\u5316\u9499\u7684\u690D\u7269\u996E\u54C1"),
      option("calcium_soy", "\u8C46\u7C7B\u3001\u8C46\u8150\u6216\u5176\u4ED6\u5927\u8C46\u5236\u54C1"),
      option("eggs", "\u9E21\u86CB"),
      option("meat_poultry", "\u8089\u7C7B\u6216\u79BD\u7C7B"),
      option("fatty_fish", "\u4E09\u6587\u9C7C\u3001\u6C99\u4E01\u9C7C\u3001\u9CAD\u9C7C\u7B49\u5BCC\u8102\u9C7C"),
      option("seafood", "\u5176\u4ED6\u9C7C\u3001\u867E\u3001\u8D1D\u7C7B\u6216\u6D77\u9C9C"),
      option("dark_greens", "\u6DF1\u7EFF\u53F6\u83DC"),
      option("orange_produce", "\u80E1\u841D\u535C\u3001\u5357\u74DC\u3001\u7EA2\u85AF\u7B49\u6A59\u9EC4\u8272\u852C\u679C"),
      option("fruit_veg", "\u5176\u4ED6\u852C\u83DC\u548C\u6C34\u679C"),
      option("whole_grains", "\u5168\u8C37\u7269\u3001\u6742\u7CAE\u6216\u85AF\u7C7B"),
      option("nuts_seeds", "\u575A\u679C\u6216\u79CD\u5B50")
    ]);
    var QUESTIONS2 = Object.freeze({
      ...INTAKE_QUESTIONS,
      [QUESTION_IDS.AUDIENCE]: Object.freeze({
        id: QUESTION_IDS.AUDIENCE,
        type: "single",
        required: true,
        eyebrow: "\u5148\u786E\u5B9A\u7ED3\u679C\u8303\u56F4",
        title: "\u8FD9\u6B21\u662F\u4E3A\u8C01\u4E86\u89E3\uFF1F",
        helper: "\u5E74\u9F84\u4F1A\u6539\u53D8\u5B89\u5168\u8FB9\u754C\uFF1B\u672A\u6210\u5E74\u4EBA\u548C 65 \u5C81\u4EE5\u4E0A\u4E0D\u4F1A\u5957\u7528\u666E\u901A\u6210\u4EBA\u8DEF\u5F84\u3002",
        options: Object.freeze([
          option(OPTION_IDS.ADULT, "18\u201364 \u5C81\u6210\u4EBA"),
          option(OPTION_IDS.SENIOR, "65 \u5C81\u53CA\u4EE5\u4E0A\u6210\u4EBA", "\u7EE7\u7EED\u4E86\u89E3\u996E\u98DF\uFF0C\u8865\u5145\u65B9\u5F0F\u9700\u7ED3\u5408\u5065\u5EB7\u60C5\u51B5"),
          option(OPTION_IDS.MINOR, "\u672A\u6EE1 18 \u5C81", "\u4E0D\u4F7F\u7528\u6210\u4EBA\u5242\u91CF\u6216\u6210\u4EBA\u529F\u80FD\u8865\u5242\u8DEF\u5F84")
        ])
      }),
      [QUESTION_IDS.SAFETY]: Object.freeze({
        id: QUESTION_IDS.SAFETY,
        type: "multi",
        required: true,
        noneOptionId: OPTION_IDS.NONE,
        eyebrow: "\u5B89\u5168\u8FB9\u754C",
        title: "\u4EE5\u4E0B\u662F\u5426\u6709\u7B26\u5408\u4F60\u7684\u60C5\u51B5\uFF1F",
        helper: "\u53EF\u591A\u9009\u3002\u53EA\u6709\u7D27\u6025\u60C5\u51B5\u4F1A\u505C\u6B62\u95EE\u5377\uFF1B\u5176\u4ED6\u60C5\u51B5\u4F1A\u7EE7\u7EED\u4E86\u89E3\uFF0C\u5E76\u8C03\u6574\u76F8\u5173\u5EFA\u8BAE\u3002",
        groups: Object.freeze([
          Object.freeze({ id: "professional", label: "\u9700\u8981\u4E13\u4E1A\u786E\u8BA4" }),
          Object.freeze({ id: "urgent", label: "\u9700\u8981\u7ACB\u5373\u5904\u7406" }),
          Object.freeze({ id: "target_flags", label: "\u53EA\u6682\u505C\u76F8\u5173\u76EE\u6807" })
        ]),
        options: Object.freeze([
          option("pregnant_or_lactating", "\u5907\u5B55\u3001\u6000\u5B55\u6216\u54FA\u4E73"),
          option("medication", "\u6B63\u5728\u4F7F\u7528\u5904\u65B9\u836F\u6216\u9700\u957F\u671F\u4F7F\u7528\u7684\u975E\u5904\u65B9\u836F"),
          option("chronic_or_labs", "\u6709\u533B\u751F\u6B63\u5728\u5904\u7406\u7684\u6162\u6027\u75C5\u6216\u5F02\u5E38\u5316\u9A8C"),
          option("malabsorption_or_bariatric", "\u6709\u5438\u6536\u969C\u788D\u6216\u505A\u8FC7\u51CF\u91CD/\u6D88\u5316\u9053\u624B\u672F"),
          option("surgery_or_reaction", "\u8FD1\u671F\u51C6\u5907\u624B\u672F\uFF0C\u6216\u66FE\u6709\u4E25\u91CD\u8865\u5145\u5242\u4E0D\u826F\u53CD\u5E94"),
          option("medical_food_restriction_quick", "\u56E0\u8FC7\u654F\u3001\u75BE\u75C5\u6216\u533B\u751F\u5EFA\u8BAE\uFF0C\u9700\u8981\u9650\u5236\u67D0\u7C7B\u98DF\u7269", "", ["quick"]),
          option("urgent_chest_breathing", "\u73B0\u5728\u6709\u80F8\u75DB\u3001\u547C\u5438\u56F0\u96BE\u3001\u6655\u53A5\u6216\u610F\u8BC6\u6DF7\u4E71"),
          option("urgent_neurologic", "\u7A81\u7136\u8BF4\u8BDD\u56F0\u96BE\u3001\u5355\u4FA7\u65E0\u529B\u3001\u62BD\u6410\u6216\u4E25\u91CD\u795E\u7ECF\u75C7\u72B6"),
          option("urgent_severe_allergy", "\u7591\u4F3C\u4E25\u91CD\u8FC7\u654F\uFF0C\u75C7\u72B6\u6B63\u5728\u5FEB\u901F\u52A0\u91CD"),
          option("urgent_vision", "\u7A81\u7136\u89C6\u529B\u4E0B\u964D/\u89C6\u91CE\u7F3A\u635F\uFF0C\u5C24\u5176\u4F34\u5267\u70C8\u5934\u75DB\u6216\u5455\u5410"),
          option("urgent_mental_safety", "\u4E25\u91CD\u8E81\u72C2\u3001\u6781\u5EA6\u6FC0\u8D8A\u3001\u65E0\u6CD5\u4FDD\u8BC1\u81EA\u8EAB\u5B89\u5168\uFF0C\u6216\u6709\u81EA\u4F24/\u4F24\u4EBA\u60F3\u6CD5"),
          option("urgent_overdose", "\u7591\u4F3C\u5927\u91CF\u8BEF\u670D\u8865\u5145\u5242\u6216\u4E0D\u660E\u8F6F\u7CD6/\u7C89\u5242"),
          option("severe_mood_impairment", "\u4E25\u91CD\u6291\u90C1\u6216\u60C5\u7EEA\u95EE\u9898\u5DF2\u660E\u663E\u65E0\u6CD5\u7EF4\u6301\u57FA\u672C\u751F\u6D3B/\u5DE5\u4F5C\uFF0C\u4F46\u6CA1\u6709\u4E0A\u8FF0\u7ACB\u5373\u5B89\u5168\u98CE\u9669"),
          option("flag_eye", "\u773C\u75DB\u3001\u590D\u89C6\u3001\u767D\u77B3\uFF0C\u6216\u6301\u7EED\u5934\u75DB/\u5455\u5410\u4F34\u89C6\u89C9\u5F02\u5E38"),
          option("flag_hair_skin", "\u7A81\u7136/\u6591\u7247\u72B6\u8131\u53D1\uFF0C\u6216\u5934\u76AE\u3001\u76AE\u75B9\u660E\u663E\u5F02\u5E38"),
          option("flag_gut", "\u4FBF\u8840/\u9ED1\u4FBF\u3001\u975E\u610F\u613F\u4F53\u91CD\u4E0B\u964D\u3001\u6301\u7EED\u5455\u5410\u3001\u541E\u54BD\u56F0\u96BE\u6216\u660E\u663E\u8179\u75DB"),
          option("flag_joint", "\u5173\u8282\u7EA2\u80BF\u53D1\u70ED\u3001\u5916\u4F24\u540E\u4E0D\u80FD\u8D1F\u91CD\u6216\u6000\u7591\u9AA8\u6298"),
          option("flag_cognition", "\u8FDB\u884C\u6027\u8BA4\u77E5\u6216\u6B65\u6001\u53D8\u5316"),
          option("flag_sleep_function", "\u547C\u5438\u6682\u505C\u3001\u767D\u5929\u65E0\u6CD5\u4FDD\u6301\u6E05\u9192\uFF0C\u6216\u60C5\u7EEA\u5DF2\u660E\u663E\u5F71\u54CD\u529F\u80FD"),
          option("flag_child_growth", "\u513F\u7AE5\u751F\u957F\u505C\u6EDE\u3001\u4F53\u91CD\u4E0B\u964D\u3001\u53D1\u80B2\u5012\u9000\u6216\u6781\u7AEF\u9650\u5236\u8FDB\u98DF"),
          option("flag_persistent_function_quick", "\u5DF2\u6709\u56F0\u6270\u6301\u7EED\u8F83\u4E45\uFF0C\u5E76\u660E\u663E\u5F71\u54CD\u5DE5\u4F5C\u3001\u5B66\u4E60\u6216\u65E5\u5E38\u751F\u6D3B", "", ["quick"]),
          option(OPTION_IDS.NONE, "\u4EE5\u4E0A\u90FD\u6CA1\u6709")
        ])
      }),
      [QUESTION_IDS.PROFILE]: Object.freeze({
        id: QUESTION_IDS.PROFILE,
        type: "profile",
        required: true,
        eyebrow: "\u57FA\u672C\u8D44\u6599",
        title: "\u5148\u8865\u5145\u4E00\u70B9\u57FA\u7840\u4FE1\u606F",
        description: "\u53EA\u7528\u4E8E\u8BA9\u8BAD\u7EC3\u548C\u996E\u98DF\u89E3\u91CA\u66F4\u8D34\u8FD1\u4F60\u7684\u60C5\u51B5\uFF1B\u4E0D\u7528\u4E8E\u8BCA\u65AD\u3001\u4F53\u91CD\u8BC4\u4EF7\u6216\u8BA1\u7B97\u4E2A\u4EBA\u5242\u91CF\u3002",
        helper: "\u751F\u7406\u6027\u522B\u5FC5\u9009\uFF1B\u8EAB\u9AD8\u548C\u4F53\u91CD\u53EF\u8DF3\u8FC7\u3002\u7B54\u6848\u53EA\u5728\u672C\u6B21\u9875\u9762\u5185\u4F7F\u7528\u3002",
        fields: Object.freeze([
          Object.freeze({ id: "age", type: "number", required: false, title: "\u5E74\u9F84\uFF08\u53EF\u9009\uFF09", placeholder: "\u4F8B\u5982 35", unit: "\u5C81", min: 0, max: 120 }),
          Object.freeze({
            id: "sex",
            type: "single",
            required: true,
            title: "\u751F\u7406\u6027\u522B",
            helper: "\u4EC5\u7528\u4E8E\u907F\u514D\u628A\u4E00\u822C\u8425\u517B\u4FE1\u606F\u5199\u6210\u201C\u4E00\u5200\u5207\u201D\u7684\u5EFA\u8BAE\u3002",
            options: Object.freeze([
              option("female", "\u5973\u6027"),
              option("male", "\u7537\u6027"),
              option("prefer_not_to_say", "\u4E0D\u60F3\u8BF4\u660E")
            ])
          }),
          Object.freeze({
            id: "height_cm",
            type: "number",
            required: false,
            title: "\u8EAB\u9AD8\uFF08\u53EF\u9009\uFF09",
            placeholder: "\u4F8B\u5982 165",
            unit: "cm",
            min: 45,
            max: 230
          }),
          Object.freeze({
            id: "weight_kg",
            type: "number",
            required: false,
            title: "\u4F53\u91CD\uFF08\u53EF\u9009\uFF09",
            placeholder: "\u4F8B\u5982 60",
            unit: "kg",
            min: 2,
            max: 300
          })
        ])
      }),
      [QUESTION_IDS.SCENES]: Object.freeze({
        id: QUESTION_IDS.SCENES,
        type: "multi",
        required: true,
        allowSelectAll: true,
        noneOptionId: OPTION_IDS.NONE,
        eyebrow: "\u751F\u6D3B\u573A\u666F",
        title: "\u8FC7\u53BB 4 \u5468\uFF0C\u4F60\u7ECF\u5E38\u5904\u5728\u54EA\u4E9B\u573A\u666F\uFF1F",
        helper: "\u53EF\u5168\u9009\u3002\u573A\u666F\u53EA\u51B3\u5B9A\u8FFD\u95EE\u548C\u89E3\u91CA\uFF0C\u4E0D\u4F1A\u76F4\u63A5\u63A8\u51FA\u67D0\u79CD\u8865\u5242\u3002",
        options: Object.freeze([
          option("knowledge_work", "\u529E\u516C\u3001\u5199\u4F5C\u3001\u7F16\u7A0B\u3001\u8BBE\u8BA1\u7B49\u8111\u529B\u5DE5\u4F5C"),
          option("student", "\u4E0A\u5B66\u3001\u5907\u8003\u3001\u79D1\u7814\u6216\u957F\u65F6\u95F4\u5B66\u4E60"),
          option("physical_work", "\u4F53\u529B\u5DE5\u4F5C\u3001\u957F\u65F6\u95F4\u7AD9\u7ACB/\u884C\u8D70\u6216\u642C\u62AC"),
          option("caregiver", "\u5168\u804C\u7167\u62A4\u3001\u5E26\u5A03\u6216\u627F\u62C5\u5927\u91CF\u5BB6\u52A1"),
          option("home_flexible", "\u5C45\u5BB6\u6216\u81EA\u7531\u804C\u4E1A\uFF0C\u751F\u6D3B\u5B89\u6392\u8F83\u7075\u6D3B"),
          option("outdoor_heat", "\u7ECF\u5E38\u5728\u6237\u5916\u3001\u9AD8\u6E29\u6216\u95F7\u70ED\u73AF\u5883\u6D3B\u52A8"),
          option("shift_work", "\u591C\u73ED\u3001\u8F6E\u73ED\u3001\u503C\u73ED\u6216\u4F5C\u606F\u7ECF\u5E38\u53D8\u5316"),
          option(OPTION_IDS.STRENGTH_SCENE, "\u89C4\u5F8B\u529B\u91CF\u8BAD\u7EC3\u3001\u589E\u808C\u6216\u9AD8\u5F3A\u5EA6\u95F4\u6B47\u8BAD\u7EC3"),
          option(OPTION_IDS.ENDURANCE_SCENE, "\u89C4\u5F8B\u8DD1\u6B65\u3001\u9A91\u884C\u3001\u7403\u7C7B\u6216\u5176\u4ED6\u8010\u529B\u8FD0\u52A8"),
          option("travel", "\u7ECF\u5E38\u51FA\u5DEE\u3001\u8DE8\u65F6\u533A\u6216\u957F\u8DDD\u79BB\u901A\u52E4"),
          option(OPTION_IDS.NONE, "\u76EE\u524D\u6CA1\u6709\u56FA\u5B9A\u573A\u666F")
        ])
      }),
      [QUESTION_IDS.DAILY_LOAD]: Object.freeze({
        id: QUESTION_IDS.DAILY_LOAD,
        type: "multi",
        required: true,
        noneOptionId: OPTION_IDS.NONE,
        eyebrow: "\u573A\u666F\u7EC6\u5316",
        title: "\u8FD9\u4E9B\u8D1F\u8377\u6216\u4F5C\u606F\uFF0C\u54EA\u4E9B\u7ECF\u5E38\u53D1\u751F\uFF1F",
        helper: "\u53EF\u591A\u9009\u3002\u628A\u804C\u4E1A\u62C6\u6210\u771F\u6B63\u5F71\u54CD\u996E\u98DF\u4E0E\u6062\u590D\u7684\u6761\u4EF6\u3002",
        options: Object.freeze([
          option("high_focus_screen", "\u957F\u65F6\u95F4\u9AD8\u5EA6\u4E13\u6CE8\u3001\u9605\u8BFB\u6216\u76EF\u5C4F\u5E55"),
          option("sedentary", "\u6BCF\u5929\u4E45\u5750\u65F6\u95F4\u5F88\u957F"),
          option("standing_walking", "\u6BCF\u5929\u957F\u65F6\u95F4\u7AD9\u7ACB\u6216\u8D70\u52A8"),
          option("heavy_physical", "\u7ECF\u5E38\u642C\u62AC\u3001\u7528\u529B\u6216\u9AD8\u4F53\u529B\u6D3B\u52A8"),
          option("emotional_care", "\u6C9F\u901A\u3001\u7167\u62A4\u6216\u60C5\u7EEA\u8D23\u4EFB\u5F88\u91CD"),
          option("unpredictable_schedule", "\u4E34\u65F6\u52A0\u73ED\u3001\u5F85\u547D\uFF0C\u4F11\u606F\u96BE\u5B89\u6392"),
          option("meals_irregular", "\u7ECF\u5E38\u9519\u8FC7\u6B63\u9910\u3001\u5F88\u665A\u5403\u6216\u7528\u96F6\u98DF/\u5916\u5356\u9876\u66FF"),
          option("indoor_days", "\u5927\u90E8\u5206\u767D\u5929\u5F85\u5728\u5BA4\u5185"),
          option("late_caffeine", "\u5496\u5561\u3001\u8336\u6216\u80FD\u91CF\u996E\u6599\u5E38\u559D\u5230\u4E0B\u5348/\u665A\u4E0A"),
          option("sweat_over_2h_limited_meals", "\u9AD8\u6E29\u6216\u8FD0\u52A8\u4E2D\u8FDE\u7EED\u660E\u663E\u51FA\u6C57\u8D85\u8FC7 2 \u5C0F\u65F6\uFF0C\u4E14\u4E0D\u65B9\u4FBF\u6B63\u5E38\u8FDB\u9910"),
          option("travel_disruption", "\u8DE8\u65F6\u533A\u6216\u65C5\u884C\u7ECF\u5E38\u6253\u65AD\u7761\u7720\u548C\u8FDB\u9910"),
          option(OPTION_IDS.NONE, "\u4EE5\u4E0A\u90FD\u4E0D\u660E\u663E")
        ])
      }),
      [QUESTION_IDS.GOALS]: Object.freeze({
        id: QUESTION_IDS.GOALS,
        type: "multi",
        required: true,
        allowSelectAll: true,
        noneOptionId: OPTION_IDS.NONE,
        eyebrow: "\u6700\u60F3\u9488\u5BF9\u7684\u95EE\u9898",
        title: "\u4F60\u73B0\u5728\u60F3\u6539\u5584\u6216\u4E86\u89E3\u4EC0\u4E48\uFF1F",
        helper: "\u4E0D\u9650\u6570\u91CF\u3002\u9009\u62E9 4 \u9879\u53CA\u4EE5\u4E0A\u4F1A\u8FDB\u5165\u7EFC\u5408\u6A21\u5F0F\uFF0C\u4F46\u4E0D\u4F1A\u628A\u6BCF\u9879\u90FD\u53D8\u6210\u4E00\u74F6\u8865\u5242\u3002",
        options: Object.freeze([
          option("sleep", "\u7761\u4E0D\u597D\uFF08\u5165\u7761\u6162\u3001\u534A\u591C\u9192\u6216\u9192\u540E\u4E0D\u89E3\u4E4F\uFF09"),
          option("stress", "\u538B\u529B\u5927\u3001\u7D27\u5F20\u6216\u96BE\u4EE5\u653E\u677E"),
          option("fatigue", "\u767D\u5929\u75B2\u52B3\u3001\u72AF\u56F0\u6216\u6CA1\u7CBE\u795E"),
          option("brain", "\u8111\u96FE\u3001\u4E13\u6CE8\u6216\u8BB0\u5FC6\u72B6\u6001\u4E0D\u7406\u60F3"),
          option(OPTION_IDS.STRENGTH_GOAL, "\u529B\u91CF\u3001\u589E\u808C\u548C\u9AD8\u5F3A\u5EA6\u8BAD\u7EC3\u8868\u73B0"),
          option(OPTION_IDS.ENDURANCE_GOAL, "\u8010\u529B\u3001\u957F\u65F6\u95F4\u8FD0\u52A8\u6216\u5927\u91CF\u51FA\u6C57\u540E\u7684\u6062\u590D"),
          option("bone", "\u9AA8\u9ABC\u3001\u9499\u548C\u7EF4\u751F\u7D20 D \u76F8\u5173\u8425\u517B"),
          option("joint", "\u5173\u8282\u6D3B\u52A8\u6216\u8FD0\u52A8\u540E\u7684\u5173\u8282\u56F0\u6270"),
          option("gut", "\u6392\u4FBF\u89C4\u5F8B\u3001\u81B3\u98DF\u7EA4\u7EF4\u548C\u6D88\u5316\u8212\u9002\u5EA6"),
          option("skin", "\u5065\u5EB7\u6210\u4EBA\u60F3\u4E86\u89E3\u76AE\u80A4\u6C34\u5408\u3001\u5F39\u6027\u6216\u80F6\u539F\uFF08\u76AE\u75B9/\u75E4\u75AE\u4E0D\u9009\u6B64\u9879\uFF09"),
          option("hair", "\u5934\u53D1\u3001\u5934\u76AE\u3001\u6307\u7532\u6216\u62C5\u5FC3\u8131\u53D1"),
          option("eyes", "\u6210\u4EBA\u957F\u65F6\u95F4\u7528\u773C/\u5C4F\u5E55\uFF0C\u60F3\u4E86\u89E3\u773C\u775B\u8425\u517B\uFF08\u89C6\u529B\u53D8\u5316\u6216\u773C\u75C5\u4E0D\u9009\u6B64\u9879\uFF09"),
          option("diet_coverage", "\u7D20\u98DF\u3001\u5C11\u9C7C\u3001\u5C11\u5976\u6216\u9650\u5236\u996E\u98DF\u7684\u8425\u517B\u8986\u76D6"),
          option("life_stage", "\u513F\u7AE5\u3001\u5B55\u54FA\u3001\u8001\u5E74\u6216\u5176\u4ED6\u751F\u547D\u9636\u6BB5\u8425\u517B"),
          option("cardiometabolic", "\u5FC3\u8840\u7BA1\u3001\u8840\u8102\u3001\u8840\u7CD6\u6216\u4F53\u91CD\u76F8\u5173\u8865\u5242\u77E5\u8BC6"),
          option("immunity", "\u611F\u5192\u3001\u514D\u75AB\u76F8\u5173\u8425\u517B\u548C\u5E38\u89C1\u4EA7\u54C1\u8FA8\u522B"),
          option(OPTION_IDS.COMPREHENSIVE_GOAL, "\u6CA1\u6709\u5355\u4E00\u95EE\u9898\uFF0C\u60F3\u505A\u4E00\u6B21\u5168\u9762\u8425\u517B\u76D8\u70B9"),
          option(OPTION_IDS.NONE, "\u6682\u65F6\u6CA1\u6709\u660E\u786E\u76EE\u6807")
        ])
      }),
      [QUESTION_IDS.SLEEP_DETAIL]: Object.freeze({
        id: QUESTION_IDS.SLEEP_DETAIL,
        type: "multi",
        required: true,
        noneOptionId: OPTION_IDS.NONE,
        eyebrow: "\u7761\u7720\u8FFD\u95EE",
        title: "\u6700\u8FD1 4 \u5468\uFF0C\u7761\u7720\u66F4\u50CF\u662F\u54EA\u4E00\u79CD\u60C5\u51B5\uFF1F",
        description: "\u628A\u201C\u7761\u4E0D\u597D\u201D\u62C6\u5F00\uFF0C\u907F\u514D\u628A\u4E0D\u540C\u95EE\u9898\u90FD\u7B3C\u7EDF\u5730\u6307\u5411\u540C\u4E00\u79CD\u6210\u5206\u3002",
        helper: "\u53EF\u591A\u9009\uFF1B\u5982\u679C\u6CA1\u6709\u7761\u7720\u56F0\u6270\uFF0C\u53EA\u662F\u60F3\u4E86\u89E3\u7CBE\u529B\u6216\u4E13\u6CE8\uFF0C\u8BF7\u9009\u6700\u540E\u4E00\u9879\u3002",
        options: Object.freeze([
          option("sleep_hard_to_start", "\u8EBA\u4E0B\u540E\u5E38\u8981\u5F88\u4E45\u624D\u80FD\u7761\u7740"),
          option("sleep_waking", "\u591C\u91CC\u5BB9\u6613\u9192\uFF0C\u9192\u540E\u4E0D\u5BB9\u6613\u518D\u7761"),
          option("sleep_early_waking", "\u6BD4\u8BA1\u5212\u65E9\u9192\u5F88\u591A\uFF0C\u800C\u4E14\u7761\u4E0D\u56DE\u53BB"),
          option("sleep_short_opportunity", "\u4E3B\u8981\u662F\u5DE5\u4F5C\u3001\u7167\u62A4\u6216\u4F5C\u606F\u6324\u5360\u4E86\u7761\u7720\u65F6\u95F4"),
          option("sleep_nonrestorative", "\u7761\u591F\u4E86\u4ECD\u5E38\u89C9\u5F97\u4E0D\u89E3\u4E4F"),
          option("sleep_schedule_shift", "\u8F6E\u73ED\u3001\u5012\u65F6\u5DEE\u6216\u4F5C\u606F\u7ECF\u5E38\u53D8\u5316"),
          option(OPTION_IDS.NONE, "\u6CA1\u6709\u7761\u7720\u56F0\u6270 / \u4E0D\u9002\u7528")
        ])
      }),
      [QUESTION_IDS.IMPACT]: Object.freeze({
        id: QUESTION_IDS.IMPACT,
        type: "single",
        required: true,
        eyebrow: "\u5F71\u54CD\u7A0B\u5EA6",
        title: "\u8FD9\u4E9B\u56F0\u6270\u6301\u7EED\u548C\u5F71\u54CD\u5230\u4EC0\u4E48\u7A0B\u5EA6\uFF1F",
        helper: "\u8FD9\u4E0D\u662F\u8BCA\u65AD\u91CF\u8868\uFF0C\u53EA\u51B3\u5B9A\u75C7\u72B6\u578B\u5185\u5BB9\u5E94\u8BE5\u5982\u4F55\u63D0\u793A\u3002",
        options: Object.freeze([
          option("occasional", "\u53EA\u662F\u5076\u5C14\u51FA\u73B0\uFF0C\u5BF9\u751F\u6D3B\u5F71\u54CD\u4E0D\u5927"),
          option("frequent_manageable", "\u7ECF\u5E38\u51FA\u73B0\uFF0C\u4F46\u8FD8\u80FD\u5E94\u4ED8"),
          option("persistent_impairing", "\u6301\u7EED\u8F83\u957F\u65F6\u95F4\uFF0C\u5E76\u660E\u663E\u5F71\u54CD\u5DE5\u4F5C\u3001\u5B66\u4E60\u6216\u751F\u6D3B"),
          option("education_only", "\u6CA1\u6709\u5728\u586B\u75C7\u72B6\uFF0C\u53EA\u60F3\u4E86\u89E3\u8425\u517B")
        ])
      }),
      [QUESTION_IDS.DIET_PATTERN]: Object.freeze({
        id: QUESTION_IDS.DIET_PATTERN,
        type: "multi",
        required: true,
        noneOptionId: OPTION_IDS.NONE,
        eyebrow: "\u996E\u98DF\u65B9\u5F0F",
        title: "\u4F60\u7684\u996E\u98DF\u65B9\u5F0F\u6709\u54EA\u4E9B\u7279\u70B9\uFF1F",
        helper: "\u53EF\u591A\u9009\u3002\u7EAF\u7D20\u8005\u4F1A\u5206\u522B\u8BC4\u4F30 B12\u3001\u9499\u3001\u7898\u3001\u94C1\u950C\u548C n-3\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u63A8\u4E00\u6574\u5957\u3002",
        options: Object.freeze([
          option("lacto_ovo_vegetarian", "\u86CB\u5976\u7D20"),
          option(OPTION_IDS.VEGAN, "\u7EAF\u7D20\u6216\u51E0\u4E4E\u4E0D\u5403\u52A8\u7269\u6027\u98DF\u7269"),
          option(OPTION_IDS.RELIABLE_B12, "\u6211\u4F1A\u6309\u6807\u7B7E\u89C4\u5F8B\u4F7F\u7528\u660E\u786E\u6807\u6CE8 B12 \u542B\u91CF\u7684\u5F3A\u5316\u98DF\u54C1\u6216\u8865\u5145\u5242"),
          option("low_dairy", "\u5F88\u5C11\u5976\u5236\u54C1\u6216\u5F3A\u5316\u9499\u66FF\u4EE3\u54C1"),
          option("low_fish", "\u5F88\u5C11\u9C7C\u548C\u6D77\u9C9C"),
          option("restricted_energy", "\u957F\u671F\u51CF\u8102\u3001\u65AD\u98DF\u6216\u660E\u663E\u9650\u5236\u603B\u98DF\u91CF"),
          option("takeaway_meal_replacement", "\u7ECF\u5E38\u5916\u5356\u3001\u4EE3\u9910\u6216\u4E0D\u65B9\u4FBF\u6B63\u5E38\u505A\u996D"),
          option("non_iodized_or_unknown_salt", "\u5BB6\u4E2D\u4E0D\u7528\u52A0\u7898\u76D0\u3001\u5F88\u5C11\u5728\u5BB6\u5403\u6216\u4E0D\u6E05\u695A"),
          option("medical_food_restriction", "\u56E0\u8FC7\u654F\u3001\u75BE\u75C5\u6216\u533B\u751F\u5EFA\u8BAE\u9650\u5236\u98DF\u7269"),
          option(OPTION_IDS.NONE, "\u4EE5\u4E0A\u90FD\u4E0D\u7B26\u5408")
        ])
      }),
      [QUESTION_IDS.FOOD_QUICK]: Object.freeze({
        id: QUESTION_IDS.FOOD_QUICK,
        type: "multi",
        required: true,
        noneOptionId: OPTION_IDS.NONE,
        eyebrow: "\u5173\u952E\u98DF\u7269\u6765\u6E90",
        title: "\u4E0B\u9762\u54EA\u4E9B\u98DF\u7269\u6216\u60C5\u51B5\uFF0C\u5E73\u65F6\u660E\u663E\u504F\u5C11\uFF1F",
        helper: "\u53EF\u5168\u9009\u3002\u53EA\u5224\u65AD\u6765\u6E90\u8986\u76D6\uFF0C\u4E0D\u6362\u7B97\u6BEB\u514B\uFF0C\u4E5F\u4E0D\u8BCA\u65AD\u7F3A\u4E4F\u3002",
        options: Object.freeze([
          option("low_dairy_calcium", "\u5976\u3001\u9178\u5976\u6216\u5F3A\u5316\u9499\u690D\u7269\u996E\u54C1"),
          option("low_calcium_soy", "\u8C46\u7C7B\u3001\u8C46\u8150\u6216\u5176\u4ED6\u5927\u8C46\u5236\u54C1"),
          option("low_eggs", "\u9E21\u86CB"),
          option("low_meat_poultry", "\u8089\u7C7B\u6216\u79BD\u7C7B"),
          option("low_fatty_fish", "\u4E09\u6587\u9C7C\u3001\u6C99\u4E01\u9C7C\u3001\u9CAD\u9C7C\u7B49\u5BCC\u8102\u9C7C"),
          option("low_seafood", "\u5176\u4ED6\u9C7C\u3001\u867E\u3001\u8D1D\u7C7B\u6216\u6D77\u9C9C"),
          option("low_dark_greens", "\u6DF1\u7EFF\u53F6\u83DC"),
          option("low_orange_produce", "\u80E1\u841D\u535C\u3001\u5357\u74DC\u3001\u7EA2\u85AF\u7B49\u6A59\u9EC4\u8272\u852C\u679C"),
          option("low_fruit_veg", "\u5176\u4ED6\u852C\u83DC\u548C\u6C34\u679C"),
          option("low_whole_grains", "\u5168\u8C37\u7269\u3001\u6742\u7CAE\u6216\u85AF\u7C7B"),
          option("low_nuts_seeds", "\u575A\u679C\u6216\u79CD\u5B50"),
          option("no_reliable_b12", "\u7EAF\u7D20\uFF0C\u4E14\u6CA1\u6709\u53EF\u9760\u7684 B12 \u5F3A\u5316\u98DF\u54C1/\u8865\u5145\u6765\u6E90"),
          option("non_iodized_or_unknown_salt", "\u4E0D\u7528\u52A0\u7898\u76D0\u3001\u5F88\u5C11\u5728\u5BB6\u5403\u6216\u4E0D\u6E05\u695A"),
          option("sweat_over_2h_limited_meals", "\u7ECF\u5E38\u8FDE\u7EED\u660E\u663E\u51FA\u6C57\u8D85\u8FC7 2 \u5C0F\u65F6\uFF0C\u4E14\u4E0D\u65B9\u4FBF\u6B63\u5E38\u8FDB\u9910"),
          option(OPTION_IDS.NONE, "\u90FD\u4E0D\u7B97\u5C11 / \u8BF4\u4E0D\u6E05")
        ])
      }),
      [QUESTION_IDS.FOOD_FREQUENCY]: Object.freeze({
        id: QUESTION_IDS.FOOD_FREQUENCY,
        type: "matrix",
        required: true,
        eyebrow: "\u98DF\u7269\u6765\u6E90\u9891\u7387",
        title: "\u8FC7\u53BB 7 \u5929\uFF0C\u8FD9\u4E9B\u98DF\u7269\u5927\u7EA6\u5403\u4E86\u51E0\u5929\uFF1F",
        helper: "\u4E0D\u7528\u56DE\u5FC6\u4EFD\u91CF\uFF0C\u6309\u6700\u63A5\u8FD1\u7684\u9891\u7387\u9009\u62E9\u5373\u53EF\u3002\u7ED3\u679C\u4ECD\u53EA\u4EE3\u8868\u6765\u6E90\u8986\u76D6\u3002",
        rows: FOOD_ROWS,
        choices: FOOD_FREQUENCY_CHOICES
      }),
      [QUESTION_IDS.TRAINING_DETAIL]: Object.freeze({
        id: QUESTION_IDS.TRAINING_DETAIL,
        type: "training",
        required: true,
        eyebrow: "\u8BAD\u7EC3\u5206\u652F",
        title: "\u4F60\u7684\u8BAD\u7EC3\u4E0E\u6062\u590D\u662F\u600E\u6837\u7684\uFF1F",
        helper: "\u6BCF\u4E2A\u4EBA\u90FD\u4F1A\u770B\u5230\u8FD9\u4E00\u6B65\u3002\u53EA\u6709\u8BAD\u7EC3\u6761\u4EF6\u660E\u786E\uFF0C\u624D\u4F1A\u51FA\u73B0\u86CB\u767D\u3001\u808C\u9178\u6216\u8FD0\u52A8\u8865\u6DB2\u7C7B\u522B\u3002",
        fields: Object.freeze([
          Object.freeze({
            id: "frequency",
            type: "single",
            title: "\u8FC7\u53BB 4 \u5468\uFF0C\u901A\u5E38\u6BCF\u5468\u89C4\u5F8B\u8BAD\u7EC3\u51E0\u6B21\uFF1F",
            options: Object.freeze([
              option("zero", "0 \u6B21"),
              option("one_two", "1\u20132 \u6B21"),
              option("three_four", "3\u20134 \u6B21"),
              option("five_plus", "5 \u6B21\u53CA\u4EE5\u4E0A")
            ])
          }),
          Object.freeze({
            id: "types",
            type: "multi",
            title: "\u8BAD\u7EC3\u7C7B\u578B\uFF08\u53EF\u591A\u9009\uFF1B\u4E0D\u89C4\u5F8B\u8BAD\u7EC3\u53EF\u4E0D\u9009\uFF09",
            options: Object.freeze([
              option("strength", "\u529B\u91CF/\u589E\u808C"),
              option("hiit", "\u77ED\u65F6\u9AD8\u5F3A\u5EA6/\u51B2\u523A/\u7403\u7C7B"),
              option("aerobic_under_60", "\u5355\u6B21\u5C11\u4E8E 60 \u5206\u949F\u7684\u6709\u6C27"),
              option("endurance_over_60", "\u5355\u6B21\u8D85\u8FC7 60 \u5206\u949F\u7684\u8010\u529B\u8BAD\u7EC3"),
              option("competition_or_twice_daily", "\u5907\u8D5B\u6216\u4E00\u5929\u591A\u7EC3")
            ])
          }),
          Object.freeze({
            id: "duration",
            type: "single",
            title: "\u5355\u6B21\u8BAD\u7EC3\u901A\u5E38\u591A\u4E45\uFF1F",
            options: Object.freeze([
              option("not_applicable", "\u4E0D\u9002\u7528 / \u6682\u65E0\u89C4\u5F8B\u8BAD\u7EC3"),
              option("under_45", "\u5C11\u4E8E 45 \u5206\u949F"),
              option("45_to_75", "45\u201375 \u5206\u949F"),
              option("over_75", "\u8D85\u8FC7 75 \u5206\u949F")
            ])
          }),
          Object.freeze({
            id: "protein_access",
            type: "single",
            title: "\u8BAD\u7EC3\u65E5\uFF0C\u6B63\u9910\u86CB\u767D\u901A\u5E38\u80FD\u5426\u7A33\u5B9A\u5403\u5230\uFF1F",
            options: Object.freeze([
              option("not_applicable", "\u4E0D\u9002\u7528 / \u6682\u65E0\u89C4\u5F8B\u8BAD\u7EC3"),
              option("adequate", "\u5927\u591A\u80FD\u7A33\u5B9A\u5403\u5230"),
              option("sometimes_hard", "\u6709\u65F6\u5F88\u96BE"),
              option("usually_hard", "\u7ECF\u5E38\u5F88\u96BE"),
              option("unknown", "\u8BF4\u4E0D\u6E05")
            ])
          })
        ])
      })
    });
    var OPTIONS_BY_QUESTION = Object.freeze(Object.keys(QUESTIONS2).reduce((result, id) => {
      result[id] = QUESTIONS2[id].options || QUESTIONS2[id].choices || [];
      return result;
    }, {}));
    function getModeDefinition(mode) {
      return MODES[mode] || MODES.quick;
    }
    module.exports = {
      MODES,
      QUESTIONS: QUESTIONS2,
      QUESTION_IDS,
      OPTION_IDS,
      OPTIONS_BY_QUESTION,
      FOOD_ROWS,
      FOOD_FREQUENCY_CHOICES,
      getModeDefinition
    };
  }
});

// resources/bubu-source/data/questions-v5.js
var require_questions_v5 = __commonJS({
  "resources/bubu-source/data/questions-v5.js"(exports, module) {
    "use strict";
    var legacy = require_questions();
    var { INTAKE_QUESTIONS } = require_intake_questions();
    var opt = (pairs) => pairs.map(([id, label]) => ({ id, label }));
    var single = (id, title, pairs, section, why = "") => ({ id, title, type: "single", required: true, section, why, options: opt(pairs) });
    var multi = (id, title, pairs, section, why = "") => ({ ...single(id, title, pairs, section, why), type: "multi", noneOptionId: "none", exclusiveIds: ["none", "unknown"], helper: "\u53EF\u591A\u9009\uFF1B\u4E0D\u786E\u5B9A\u53EF\u4EE5\u76F4\u63A5\u8BF4\u660E\u3002" });
    var field = (id, title, pairs, type = "single") => ({ id, title, type, required: true, options: opt(pairs), exclusiveIds: ["none", "unknown"] });
    var fields = (id, title, rows, section, why = "") => ({ id, title, type: "fields", required: true, fields: rows, section, why });
    var frequency = opt([["rare", "\u6BCF\u5468 0\u20131 \u5929"], ["some", "\u6BCF\u5468 2\u20134 \u5929"], ["often", "\u6BCF\u5468 5\u20137 \u5929"], ["unknown", "\u4E0D\u786E\u5B9A"]]);
    var portion = (small, regular) => opt([["zero", "\u57FA\u672C\u4E0D\u5403"], ["small", small], ["regular", regular], ["unknown", "\u4E0D\u786E\u5B9A"]]);
    var matrix = (id, title, rows, section, why = "") => ({ id, title, type: "matrix", required: true, rows, choices: frequency, section, why, helper: "\u6309\u6700\u8FD1\u4E00\u4E2A\u6708\u7684\u901A\u5E38\u5403\u6CD5\uFF0C\u4E0D\u7528\u4E3A\u4E86\u67D0\u4E00\u5929\u7684\u4F8B\u5916\u7EA0\u7ED3\u3002" });
    var reused = (id, section, changes = {}) => ({ ...legacy.QUESTIONS[id], section, ...changes });
    var QUESTIONS2 = {
      audience: single("audience", "\u8FD9\u6B21\u60F3\u4E3A\u8C01\u4E86\u89E3\u8425\u517B\uFF1F", [["adult_18_64", "18\u201364 \u5C81\u6210\u4EBA"], ["senior_65_plus", "65 \u5C81\u53CA\u4EE5\u4E0A\u6210\u4EBA"], ["minor_under_18", "\u672A\u6EE1 18 \u5C81\uFF0C\u7531\u76D1\u62A4\u4EBA\u586B\u5199"]], "\u5173\u4E8E\u4F60", "\u4E0D\u540C\u5E74\u9F84\u7684\u9700\u8981\u4E0D\u540C\u3002\u513F\u7AE5\u4E0D\u4F1A\u5957\u7528\u6210\u4EBA\u8865\u5145\u65B9\u6848\u3002"),
      profile: reused("profile", "\u5173\u4E8E\u4F60", {
        title: "\u5148\u8BA4\u8BC6\u4E00\u4E0B\u4F60",
        description: "",
        helper: "\u8EAB\u9AD8\u3001\u4F53\u91CD\u53EF\u7559\u7A7A\uFF1B\u751F\u7406\u6027\u522B\u4E5F\u53EF\u4EE5\u9009\u62E9\u4E0D\u8BF4\u660E\u3002",
        why: "\u8FD9\u4E9B\u4FE1\u606F\u7528\u4E8E\u533A\u5206\u9002\u7528\u4EBA\u7FA4\uFF0C\u4E0D\u4F1A\u7528\u8EAB\u9AD8\u3001\u4F53\u91CD\u731C\u6D4B\u4F60\u7F3A\u54EA\u4E00\u79CD\u8425\u517B\u3002",
        fields: [
          ...legacy.QUESTIONS.profile.fields,
          field("life_stage", "\u76EE\u524D\u5904\u4E8E\u54EA\u4E2A\u9636\u6BB5\uFF1F", [["usual", "\u4E0D\u5C5E\u4E8E\u4EE5\u4E0B\u9636\u6BB5"], ["planning", "\u5907\u5B55"], ["pregnant", "\u5B55\u671F"], ["lactating", "\u54FA\u4E73\u671F"], ["menopause", "\u56F4\u7EDD\u7ECF\u671F\u6216\u7EDD\u7ECF\u540E"], ["unknown", "\u4E0D\u60F3\u8BF4\u660E"]]),
          field("weight_change", "\u8FD1 3 \u4E2A\u6708\uFF0C\u4F53\u91CD\u662F\u5426\u660E\u663E\u53D8\u5316\uFF1F", [["stable", "\u57FA\u672C\u7A33\u5B9A"], ["intentional", "\u6709\uFF0C\u5728\u4E3B\u52A8\u8C03\u6574\u4F53\u91CD"], ["unintentional", "\u6709\uFF0C\u5E76\u4E0D\u662F\u4E3B\u52A8\u51CF\u91CD"], ["unknown", "\u4E0D\u786E\u5B9A"]])
        ]
      }),
      safety: multi("safety", "\u6709\u6CA1\u6709\u9700\u8981\u5148\u7559\u610F\u7684\u5065\u5EB7\u60C5\u51B5\uFF1F", [
        ["medication", "\u6B63\u5728\u957F\u671F\u7528\u836F"],
        ["chronic_or_labs", "\u6709\u6162\u6027\u75C5\u6216\u5DF2\u77E5\u5F02\u5E38\u68C0\u67E5"],
        ["medical_food_restriction_quick", "\u533B\u751F\u8981\u6C42\u9650\u5236\u98DF\u7269\u3001\u94BE\u3001\u78F7\u6216\u86CB\u767D\u8D28"],
        ["malabsorption_or_bariatric", "\u5438\u6536\u969C\u788D\u6216\u505A\u8FC7\u51CF\u91CD / \u6D88\u5316\u9053\u624B\u672F"],
        ["surgery_or_reaction", "\u8FD1\u671F\u624B\u672F\u6216\u4E25\u91CD\u8865\u5145\u5242\u4E0D\u826F\u53CD\u5E94"],
        ["urgent_chest_breathing", "\u73B0\u5728\u6709\u80F8\u75DB\u3001\u547C\u5438\u56F0\u96BE\u3001\u6655\u53A5\u6216\u610F\u8BC6\u5F02\u5E38"],
        ["urgent_neurologic", "\u7A81\u7136\u5355\u4FA7\u65E0\u529B\u3001\u8BF4\u8BDD\u56F0\u96BE\u6216\u4E25\u91CD\u795E\u7ECF\u75C7\u72B6"],
        ["urgent_vision", "\u7A81\u7136\u89C6\u529B\u4E0B\u964D\u6216\u5267\u70C8\u773C\u75DB"],
        ["urgent_severe_allergy", "\u4E25\u91CD\u8FC7\u654F\u6B63\u5728\u52A0\u91CD\uFF0C\u6216\u7591\u4F3C\u5927\u91CF\u8BEF\u670D"],
        ["urgent_mental_safety", "\u76EE\u524D\u65E0\u6CD5\u4FDD\u8BC1\u81EA\u8EAB\u5B89\u5168\uFF0C\u6216\u6709\u81EA\u4F24\u60F3\u6CD5"],
        ["persistent_symptoms", "\u8FD1\u671F\u4E0D\u9002\u6301\u7EED\u5B58\u5728\uFF0C\u5DF2\u660E\u663E\u5F71\u54CD\u65E5\u5E38\u751F\u6D3B"],
        ["none", "\u4EE5\u4E0A\u90FD\u6CA1\u6709"],
        ["unknown", "\u4E0D\u786E\u5B9A / \u6682\u4E0D\u8BF4\u660E"]
      ], "\u5065\u5EB7\u4E0E\u7528\u836F", "\u957F\u671F\u7528\u836F\u4E0D\u4F1A\u63D0\u524D\u7ED3\u675F\u95EE\u5377\u3002\u6211\u4EEC\u4F1A\u53EA\u8C03\u6574\u53D7\u5F71\u54CD\u7684\u5EFA\u8BAE\uFF1B\u7D27\u6025\u4E0D\u9002\u9700\u8981\u7ACB\u5373\u5904\u7406\u3002"),
      health_detail: reused("health_detail", "\u5065\u5EB7\u4E0E\u7528\u836F", { helper: "\u4E0D\u8BA4\u8BC6\u836F\u7269\u7C7B\u522B\u53EF\u4EE5\u9009\u201C\u4E0D\u77E5\u9053\u201D\uFF0C\u4E0D\u7528\u731C\uFF0C\u4E5F\u4E0D\u8981\u81EA\u884C\u505C\u836F\u3002" }),
      child_detail: fields("child_detail", "\u5B69\u5B50\u7684\u996E\u98DF\u548C\u751F\u957F\u60C5\u51B5", [
        field("stage", "\u5B69\u5B50\u5C5E\u4E8E\u54EA\u4E2A\u5E74\u9F84\u6BB5\uFF1F", [["infant", "\u672A\u6EE1 1 \u5C81"], ["toddler", "1\u20133 \u5C81"], ["child", "4\u201311 \u5C81"], ["teen", "12\u201317 \u5C81"]]),
        field("growth", "\u8FD1\u671F\u751F\u957F\u548C\u8FDB\u98DF\u60C5\u51B5", [["usual", "\u751F\u957F\u548C\u8FDB\u98DF\u57FA\u672C\u7A33\u5B9A"], ["picky", "\u660E\u663E\u6311\u98DF\u6216\u957F\u671F\u4E0D\u5403\u591A\u7C7B\u98DF\u7269"], ["concern", "\u751F\u957F\u505C\u6EDE\u3001\u4F53\u91CD\u4E0B\u964D\u6216\u541E\u54BD\u56F0\u96BE"], ["unknown", "\u4E0D\u786E\u5B9A"]]),
        field("feeding", "\u4E3B\u8981\u996E\u98DF", [["milk", "\u6BCD\u4E73 / \u914D\u65B9\u5976\u4E3A\u4E3B"], ["mixed", "\u5976\u4E0E\u8F85\u98DF\u6216\u6B63\u9910\u5E76\u884C"], ["meals", "\u4EE5\u65E5\u5E38\u6B63\u9910\u4E3A\u4E3B"]])
      ], "\u5173\u4E8E\u4F60", "\u513F\u7AE5\u9700\u8981\u5355\u72EC\u7684\u5E74\u9F84\u6807\u51C6\u3002\u672C\u6B21\u6574\u7406\u98DF\u7269\u6765\u6E90\uFF0C\u8865\u5145\u54C1\u548C\u5242\u91CF\u7531\u513F\u79D1\u786E\u8BA4\u3002"),
      child_food: fields("child_food", "\u8BB0\u5F55\u5B69\u5B50\u5B9E\u9645\u7684\u98DF\u7269\u6765\u6E90", [
        field("milk", "\u5976\u6216\u9002\u9F84\u66FF\u4EE3\u6765\u6E90", [["regular", "\u6709\u7A33\u5B9A\u6765\u6E90"], ["little", "\u6BD4\u8F83\u5C11 / \u5F88\u96BE\u5B89\u6392"], ["unknown", "\u4E0D\u6E05\u695A"]]),
        field("variety", "\u8F85\u98DF\u6216\u6B63\u9910\u7684\u79CD\u7C7B", [["not_started", "\u8FD8\u6CA1\u6709\u5F00\u59CB\u8F85\u98DF"], ["varied", "\u79CD\u7C7B\u8F83\u591A\uFF0C\u80FD\u8F6E\u6362\u5403"], ["restricted", "\u957F\u671F\u5C11\u5403\u597D\u51E0\u7C7B\u98DF\u7269"], ["unknown", "\u4E0D\u6E05\u695A"]]),
        field("plan", "\u662F\u5426\u5DF2\u6709\u513F\u79D1\u7ED9\u51FA\u7684\u8425\u517B\u8865\u5145\u5B89\u6392\uFF1F", [["yes", "\u6709\uFF0C\u6B63\u5728\u6309\u5B89\u6392\u6267\u884C"], ["no", "\u6CA1\u6709"], ["unknown", "\u4E0D\u6E05\u695A"]])
      ], "\u5B69\u5B50\u7684\u996E\u98DF", "\u5148\u8BB0\u5F55\u5B9E\u9645\u6765\u6E90\uFF0C\u4E0D\u8981\u6C42\u7528\u6210\u4EBA\u6BCF\u5929\u591A\u5C11\u514B\u7684\u6807\u51C6\u8861\u91CF\u5B69\u5B50\u3002"),
      scenes: reused("scenes", "\u4F60\u7684\u65E5\u5E38", { title: "\u6700\u8FD1\uFF0C\u4F60\u7684\u65E5\u5E38\u66F4\u50CF\u54EA\u4E9B\u573A\u666F\uFF1F", helper: "\u53EF\u4EE5\u591A\u9009\uFF0C\u4E5F\u53EF\u4EE5\u5168\u9009\u3002", why: "\u5DE5\u4F5C\u3001\u5B66\u4E60\u548C\u7167\u62A4\u4F1A\u5F71\u54CD\u4F5C\u606F\u4E0E\u5403\u996D\u5B89\u6392\u3002\u63A5\u4E0B\u6765\u53EA\u8FFD\u95EE\u4E0E\u4F60\u76F8\u5173\u7684\u5185\u5BB9\u3002" }),
      daily_load: reused("daily_load", "\u4F60\u7684\u65E5\u5E38", { title: "\u65E5\u5E38\u6700\u5E38\u9047\u5230\u54EA\u4E9B\u60C5\u51B5\uFF1F", helper: "\u53EF\u591A\u9009\u3002", why: "\u5173\u6CE8\u771F\u5B9E\u7684\u4F5C\u606F\u548C\u996E\u98DF\u6761\u4EF6\uFF0C\u800C\u4E0D\u662F\u53EA\u770B\u804C\u4E1A\u540D\u79F0\u3002" }),
      goals: reused("goals", "\u4F60\u7684\u76EE\u6807", { title: "\u8FD9\u6B21\uFF0C\u4F60\u6700\u60F3\u5173\u6CE8\u54EA\u4E9B\u65B9\u9762\uFF1F", helper: "\u53EF\u4EE5\u591A\u9009\u6216\u5168\u9009\uFF0C\u4E0B\u4E00\u6B65\u518D\u6392\u8F7B\u91CD\u3002", options: opt([
        ["sleep", "\u7761\u7720"],
        ["stress", "\u538B\u529B\u4E0E\u653E\u677E"],
        ["fatigue", "\u767D\u5929\u7CBE\u529B"],
        ["brain", "\u4E13\u6CE8\u4E0E\u8BB0\u5FC6"],
        ["strength", "\u529B\u91CF\u4E0E\u589E\u808C"],
        ["endurance", "\u8010\u529B\u4E0E\u8FD0\u52A8\u6062\u590D"],
        ["bone", "\u9AA8\u9ABC\u8425\u517B"],
        ["skin", "\u76AE\u80A4\u72B6\u6001"],
        ["hair", "\u5934\u53D1\u4E0E\u6307\u7532"],
        ["eyes", "\u773C\u90E8\u8212\u9002"],
        ["gut", "\u6D88\u5316\u4E0E\u6392\u4FBF"],
        ["diet_coverage", "\u996E\u98DF\u9650\u5236\u4E0B\u7684\u8425\u517B"],
        ["comprehensive", "\u5168\u9762\u4E86\u89E3\u8425\u517B"],
        ["none", "\u6682\u65F6\u6CA1\u6709\u7279\u522B\u5173\u6CE8\u7684"]
      ]), why: "\u76EE\u6807\u5E2E\u4F60\u5B89\u6392\u9605\u8BFB\u91CD\u70B9\u3002\u662F\u5426\u9700\u8981\u67D0\u79CD\u8865\u5145\uFF0C\u8FD8\u8981\u770B\u98DF\u7269\u6765\u6E90\u548C\u5B9E\u9645\u60C5\u51B5\u3002" }),
      goal_priority: single("goal_priority", "\u5982\u679C\u5148\u6539\u5584\u4E00\u4EF6\u4E8B\uFF0C\u4F60\u4F1A\u9009\u4EC0\u4E48\uFF1F", [["equal", "\u90FD\u4E00\u6837\u91CD\u8981"]], "\u4F60\u7684\u76EE\u6807", "\u53EA\u5F71\u54CD\u540C\u7B49\u6761\u4EF6\u4E0B\u7684\u5C55\u793A\u987A\u5E8F\uFF0C\u4E0D\u4F1A\u56E0\u4E3A\u9009\u4E86\u7761\u7720\u5C31\u8BA4\u5B9A\u7F3A\u9541\u3002"),
      diet_style: single("diet_style", "\u4F60\u5E73\u65F6\u600E\u4E48\u5403\uFF1F", [["mixed", "\u8364\u7D20\u90FD\u5403"], ["vegetarian", "\u86CB\u5976\u7D20\uFF0C\u4E0D\u5403\u8089\u9C7C"], ["vegan", "\u7EAF\u7D20\uFF0C\u4E0D\u5403\u52A8\u7269\u6027\u98DF\u7269"], ["restricted", "\u6709\u5176\u4ED6\u996E\u98DF\u9650\u5236"], ["unknown", "\u4E0D\u786E\u5B9A"]], "\u65E5\u5E38\u996E\u98DF"),
      exclusions: multi("exclusions", "\u6709\u54EA\u4E9B\u98DF\u7269\u9700\u8981\u907F\u5F00\uFF1F", [["dairy", "\u5976\u5236\u54C1"], ["soy", "\u5927\u8C46\u548C\u8C46\u5236\u54C1"], ["fish", "\u9C7C\u7C7B"], ["shellfish", "\u867E\u87F9\u8D1D\u7C7B"], ["nuts", "\u575A\u679C"], ["eggs", "\u86CB\u7C7B"], ["gluten", "\u542B\u9EB8\u8D28\u8C37\u7269"], ["other", "\u5176\u4ED6\u98DF\u7269"], ["none", "\u6CA1\u6709"], ["unknown", "\u4E0D\u786E\u5B9A"]], "\u65E5\u5E38\u996E\u98DF", "\u4E0D\u63A8\u8350\u4F60\u8FC7\u654F\u3001\u4E0D\u8010\u53D7\u6216\u660E\u786E\u4E0D\u5403\u7684\u98DF\u7269\u3002\u5176\u4ED6\u8FC7\u654F\u8BF7\u7EE7\u7EED\u6309\u5DF2\u6709\u8981\u6C42\u907F\u5F00\u3002"),
      diet_habits: fields("diet_habits", "\u5E73\u5E38\u5403\u996D\u7684\u5B89\u6392\u662F\u600E\u6837\u7684\uFF1F", [
        field("meals", "\u901A\u5E38\u4E00\u5929\u5403\u51E0\u987F\u6B63\u9910\uFF1F", [["one_two", "1\u20132 \u987F\uFF0C\u7ECF\u5E38\u6F0F\u9910"], ["regular", "3 \u987F\u5DE6\u53F3\uFF0C\u6BD4\u8F83\u89C4\u5F8B"], ["unknown", "\u53D8\u5316\u5F88\u5927"]]),
        field("restriction", "\u6709\u6CA1\u6709\u957F\u671F\u51CF\u5C11\u98DF\u91CF\u6216\u79CD\u7C7B\uFF1F", [["no", "\u6CA1\u6709"], ["energy", "\u4E3B\u52A8\u5C11\u5403\u6216\u63A7\u5236\u603B\u70ED\u91CF"], ["many_foods", "\u5F88\u591A\u98DF\u7269\u5403\u4E0D\u4E86\uFF0C\u4E5F\u96BE\u627E\u5230\u66FF\u4EE3"], ["unknown", "\u4E0D\u786E\u5B9A"]]),
        field("duration", "\u8FD9\u79CD\u5403\u6CD5\u6301\u7EED\u4E86\u591A\u4E45\uFF1F", [["recent", "\u4E0D\u5230 1 \u4E2A\u6708"], ["months", "1\u20133 \u4E2A\u6708"], ["long", "\u8D85\u8FC7 3 \u4E2A\u6708"], ["unknown", "\u4E0D\u786E\u5B9A"]])
      ], "\u65E5\u5E38\u996E\u98DF"),
      quick_food: matrix("quick_food", "\u8FD9\u4E9B\u98DF\u7269\uFF0C\u4F60\u5E73\u65F6\u5403\u5F97\u591A\u5417\uFF1F", [
        { id: "calcium", label: "\u5976\u3001\u9178\u5976\u3001\u52A0\u9499\u996E\u54C1\u6216\u5176\u4ED6\u53EF\u9760\u542B\u9499\u98DF\u7269", description: "\u666E\u901A\u8C46\u6D46\u4E0D\u9ED8\u8BA4\u542B\u9499\u4E30\u5BCC\u3002" },
        { id: "fish", label: "\u4E09\u6587\u9C7C\u3001\u6C99\u4E01\u9C7C\u3001\u9CAD\u9C7C\u7B49\u5BCC\u8102\u9C7C", choices: opt([["zero", "\u4E0D\u5403"], ["rare", "\u4E0D\u5230\u6BCF\u5468 1 \u6B21"], ["some", "\u6BCF\u5468 1 \u6B21"], ["often", "\u6BCF\u5468 2 \u6B21\u53CA\u4EE5\u4E0A"], ["unknown", "\u4E0D\u786E\u5B9A"]]) },
        { id: "b12", label: "\u8089\u3001\u9C7C\u3001\u86CB\u3001\u5976\u6216\u660E\u786E\u5F3A\u5316 B12 \u7684\u98DF\u7269" },
        { id: "magnesium", label: "\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u575A\u679C\u3001\u7EFF\u53F6\u83DC" },
        { id: "vegetables", label: "\u852C\u83DC\uFF0C\u4E0D\u53EA\u662F\u51E0\u53E3\u914D\u83DC" },
        { id: "fruit", label: "\u5B8C\u6574\u6C34\u679C\uFF0C\u4E0D\u542B\u679C\u6C41" }
      ], "\u98DF\u7269\u6765\u6E90", "\u6BCF\u4E00\u79CD\u6765\u6E90\u90FD\u5206\u522B\u786E\u8BA4\uFF0C\u907F\u514D\u628A\u201C\u4E0D\u786E\u5B9A\u201D\u5F53\u4F5C\u201C\u6CA1\u6709\u201D\u3002\u6781\u7B80\u7248\u4E0D\u4F30\u7B97\u6BEB\u514B\u7F3A\u53E3\u3002"),
      dairy_food: fields("dairy_food", "\u5148\u770B\u770B\u4F60\u6BCF\u5929\u7684\u5976\u548C\u8C46\u5236\u54C1", [
        field("kind", "\u901A\u5E38\u559D\u54EA\u4E00\u79CD\uFF1F", [["dairy", "\u725B\u5976\u3001\u9178\u5976\u6216\u65E0\u4E73\u7CD6\u5976"], ["fortified", "\u6807\u7B7E\u660E\u786E\u52A0\u9499\u7684\u690D\u7269\u996E\u54C1"], ["unfortified", "\u666E\u901A\u8C46\u6D46\u7B49\u672A\u5F3A\u5316\u996E\u54C1"], ["none", "\u57FA\u672C\u4E0D\u559D"], ["unknown", "\u4E0D\u77E5\u9053\u662F\u5426\u5F3A\u5316"]]),
        field("amount", "\u5E73\u5747\u6BCF\u5929\u559D\u591A\u5C11\uFF1F", [["zero", "\u57FA\u672C\u6CA1\u6709"], ["small", "\u4E0D\u8DB3 250 mL"], ["regular", "250\u2013500 mL"], ["large", "\u8D85\u8FC7 500 mL"], ["unknown", "\u4E0D\u786E\u5B9A"]]),
        field("tofu", "\u5E73\u5747\u6BCF\u5929\u5403\u591A\u5C11\u8C46\u8150\u3001\u8C46\u5E72\u7B49\uFF1F", [["zero", "\u57FA\u672C\u6CA1\u6709"], ["small", "\u4E0D\u8DB3 100 g"], ["regular", "100\u2013200 g"], ["large", "\u8D85\u8FC7 200 g"], ["unknown", "\u4E0D\u786E\u5B9A"]]),
        field("tofu_kind", "\u5E38\u5403\u7684\u8C46\u8150\u662F\u54EA\u79CD\uFF1F", [["calcium", "\u786B\u9178\u9499 / \u77F3\u818F\u7B49\u542B\u9499\u51DD\u56FA\u5242"], ["other", "\u5185\u916F\u8C46\u8150\u6216\u5176\u4ED6\u7C7B\u578B"], ["none", "\u57FA\u672C\u4E0D\u5403"], ["unknown", "\u4E0D\u77E5\u9053"]])
      ], "\u5976\u8C46\u9C7C\u8089\u86CB", "\u9499\u6765\u6E90\u8981\u540C\u65F6\u770B\u79CD\u7C7B\u548C\u4EFD\u91CF\u3002\u52A0\u9499\u996E\u54C1\u53EF\u4EE5\u66FF\u4EE3\u5976\uFF0C\u666E\u901A\u8C46\u6D46\u4E0D\u80FD\u76F4\u63A5\u6309\u5976\u8BA1\u7B97\u3002"),
      calcium_label: { id: "calcium_label", title: "\u624B\u8FB9\u6709\u996E\u54C1\u7684\u8425\u517B\u6807\u7B7E\u5417\uFF1F", type: "profile", required: false, section: "\u5976\u8C46\u9C7C\u8089\u86CB", helper: "\u53EF\u5168\u90E8\u7559\u7A7A\u3002\u53EA\u8BA1\u7B97\u8FD9\u4EFD\u996E\u54C1\u7684\u9499\uFF0C\u4E0D\u5F53\u4F5C\u5168\u5929\u6444\u5165\u3002", why: "\u6709\u771F\u5B9E\u6807\u7B7E\u624D\u80FD\u628A\u98DF\u7269\u8D21\u732E\u7B97\u6E05\u695A\uFF0C\u4E0D\u7528\u7C97\u7565\u9891\u7387\u731C\u6BEB\u514B\u3002", fields: [
        { id: "ml", title: "\u8FD9\u6B3E\u996E\u54C1\u5E73\u5747\u6BCF\u5929\u559D\u591A\u5C11", type: "number", required: false, unit: "mL", min: 0, max: 3e3, placeholder: "\u53EF\u8DF3\u8FC7\uFF0C\u4F8B\u5982 300" },
        { id: "mg", title: "\u6807\u7B7E\u6BCF 100 mL \u542B\u9499\u591A\u5C11", type: "number", required: false, unit: "mg", min: 0, max: 1e3, placeholder: "\u770B\u6807\u7B7E\uFF0C\u53EF\u8DF3\u8FC7" }
      ] },
      calcium_alternatives: multi("calcium_alternatives", "\u8FD8\u6709\u8FD9\u4E9B\u56FA\u5B9A\u7684\u542B\u9499\u6765\u6E90\u5417\uFF1F", [["cheese", "\u591A\u6570\u5929\u5403\u5976\u916A\uFF0C\u4F1A\u7559\u610F\u6807\u7B7E\u542B\u9499\u91CF"], ["bone_fish", "\u7ECF\u5E38\u5403\u8FDE\u9AA8\u7684\u5C0F\u9C7C\u6216\u6C99\u4E01\u9C7C"], ["fortified", "\u5176\u4ED6\u98DF\u54C1\u6807\u7B7E\u660E\u786E\u52A0\u9499\uFF0C\u5E76\u89C4\u5F8B\u98DF\u7528"], ["none", "\u6CA1\u6709\u8FD9\u4E9B\u6765\u6E90"], ["unknown", "\u4E0D\u786E\u5B9A"]], "\u98DF\u7269\u6765\u6E90", "\u5C11\u559D\u5976\u4E0D\u4E00\u5B9A\u9499\u6765\u6E90\u5C11\uFF0C\u8FD8\u8981\u628A\u66FF\u4EE3\u98DF\u7269\u7B97\u8FDB\u53BB\u3002"),
      animal_food: matrix("animal_food", "\u9C7C\u3001\u8089\u548C\u86CB\uFF0C\u901A\u5E38\u600E\u4E48\u5403\uFF1F", [
        { id: "fish", label: "\u5BCC\u8102\u9C7C\uFF08\u4E00\u6B21\u7EA6\u4E00\u638C\u5FC3\u53EF\u98DF\u9C7C\u8089\uFF09", choices: opt([["zero", "\u4E0D\u5403"], ["rare", "\u4E0D\u5230\u6BCF\u5468 1 \u6B21"], ["some", "\u6BCF\u5468 1 \u6B21"], ["often", "\u6BCF\u5468 2 \u6B21\u53CA\u4EE5\u4E0A"], ["unknown", "\u4E0D\u786E\u5B9A"]]) },
        { id: "meat", label: "\u8089\u3001\u79BD\u6216\u5176\u4ED6\u9C7C\u867E\uFF08\u5E73\u5747\u6BCF\u5929\u53EF\u98DF\u751F\u91CD\uFF09", choices: portion("\u4E0D\u8DB3 100 g", "100 g \u53CA\u4EE5\u4E0A") },
        { id: "red_meat", label: "\u7EA2\u8089\u6216\u8D1D\u7C7B", choices: frequency },
        { id: "eggs", label: "\u5168\u86CB\uFF08\u5305\u62EC\u86CB\u9EC4\uFF09", choices: frequency }
      ], "\u5976\u8C46\u9C7C\u8089\u86CB", "\u9C7C\u79CD\u5F71\u54CD EPA / DHA\uFF0C\u7EA2\u8089\u4E0E\u8D1D\u7C7B\u6709\u4E0D\u540C\u7684\u94C1\u950C\u6765\u6E90\uFF0C\u86CB\u9EC4\u4E5F\u662F\u80C6\u78B1\u6765\u6E90\u3002"),
      plant_food: matrix("plant_food", "\u852C\u679C\u548C\u4E3B\u98DF\uFF0C\u5E73\u5747\u6BCF\u5929\u6709\u591A\u5C11\uFF1F", [
        { id: "vegetables", label: "\u852C\u83DC\uFF08\u751F\u91CD\uFF09", choices: portion("\u4E0D\u5230 300 g", "300 g \u53CA\u4EE5\u4E0A") },
        { id: "fruit", label: "\u5B8C\u6574\u6C34\u679C", choices: portion("\u4E0D\u5230 200 g", "200 g \u53CA\u4EE5\u4E0A") },
        { id: "whole_grains", label: "\u71D5\u9EA6\u3001\u7CD9\u7C73\u3001\u5168\u9EA6\u7B49", choices: portion("\u4E0D\u5230\u4E3B\u98DF\u7684 1/3", "\u7EA6\u5360\u4E3B\u98DF 1/3 \u6216\u66F4\u591A") },
        { id: "beans", label: "\u719F\u6742\u8C46\uFF0C\u4E0D\u91CD\u590D\u7B97\u8C46\u8150", choices: portion("\u4E0D\u5230\u534A\u7897", "\u534A\u7897\u6216\u66F4\u591A") },
        { id: "nuts", label: "\u53BB\u58F3\u575A\u679C\u3001\u79CD\u5B50", choices: portion("\u4E0D\u5230\u4E00\u5C0F\u628A\uFF08\u7EA6 10 g\uFF09", "\u4E00\u5C0F\u628A\u6216\u66F4\u591A") }
      ], "\u852C\u679C\u4E0E\u4E3B\u98DF", "\u8FD9\u91CC\u770B\u6765\u6E90\u662F\u5426\u7A33\u5B9A\uFF0C\u4E0D\u628A\u7C97\u7565\u4EFD\u91CF\u5F53\u6210\u7CBE\u786E\u7684\u8425\u517B\u6444\u5165\u91CF\u3002"),
      plant_types: matrix("plant_types", "\u518D\u770B\u770B\u98DF\u7269\u7684\u79CD\u7C7B", [
        { id: "greens", label: "\u6DF1\u7EFF\u53F6\u83DC" },
        { id: "orange", label: "\u80E1\u841D\u535C\u3001\u5357\u74DC\u7B49\u6A59\u9EC4\u8272\u852C\u679C" },
        { id: "potato", label: "\u571F\u8C46\u3001\u7EA2\u85AF\u7B49\u85AF\u7C7B" }
      ], "\u852C\u679C\u4E0E\u4E3B\u98DF"),
      fortified: multi("fortified", "\u6709\u56FA\u5B9A\u5403\u8FD9\u4E9B\u5F3A\u5316\u98DF\u54C1\u5417\uFF1F", [["vitamin_d", "\u660E\u786E\u6DFB\u52A0\u7EF4\u751F\u7D20 D"], ["b12", "\u660E\u786E\u6DFB\u52A0 B12"], ["none", "\u6CA1\u6709"], ["unknown", "\u6CA1\u770B\u8FC7\u6807\u7B7E"]], "\u5F3A\u5316\u98DF\u54C1\u4E0E\u6CB9\u76D0", "\u53EA\u7B97\u6807\u7B7E\u660E\u786E\u6807\u6CE8\u3001\u5E76\u89C4\u5F8B\u98DF\u7528\u7684\u98DF\u54C1\u3002\u666E\u901A\u725B\u5976\u4E0D\u9ED8\u8BA4\u6DFB\u52A0\u7EF4\u751F\u7D20 D\u3002"),
      cooking: fields("cooking", "\u5BB6\u91CC\u901A\u5E38\u7528\u4EC0\u4E48\u6CB9\u548C\u76D0\uFF1F", [
        field("salt", "\u98DF\u76D0", [["iodized", "\u52A0\u7898\u76D0"], ["non_iodized", "\u672A\u52A0\u7898\u76D0"], ["potassium_salt", "\u542B\u94BE\u4F4E\u94A0\u76D0"], ["unknown", "\u5916\u98DF\u591A / \u4E0D\u6E05\u695A"]]),
        field("oil", "\u70F9\u8C03\u6CB9", [["plant", "\u4E3B\u8981\u7528\u690D\u7269\u6CB9"], ["animal", "\u4E3B\u8981\u662F\u9EC4\u6CB9\u3001\u732A\u6CB9\u6216\u6930\u5B50\u6CB9"], ["little", "\u957F\u671F\u51E0\u4E4E\u4E0D\u5403\u6CB9\u8102"], ["unknown", "\u4E0D\u6E05\u695A"]])
      ], "\u5F3A\u5316\u98DF\u54C1\u4E0E\u6CB9\u76D0"),
      daylight: single("daylight", "\u767D\u5929\u901A\u5E38\u6709\u591A\u5C11\u6237\u5916\u6D3B\u52A8\uFF1F", [["little", "\u591A\u6570\u5929\u5728\u5BA4\u5185\uFF0C\u6216\u4E3B\u8981\u9694\u7740\u73BB\u7483"], ["some", "\u6BCF\u5468\u6709\u51E0\u5929\uFF0C\u591A\u906E\u6321\u6216\u65F6\u95F4\u8F83\u77ED"], ["regular", "\u591A\u6570\u5929\u6709\u6237\u5916\u6D3B\u52A8"], ["unknown", "\u53D8\u5316\u5F88\u5927 / \u4E0D\u6E05\u695A"]], "\u4E0E\u4F60\u6709\u5173\u7684\u7EC6\u8282", "\u6237\u5916\u53EA\u662F\u7EF4\u751F\u7D20 D \u7684\u80CC\u666F\u4FE1\u606F\uFF0C\u4E0D\u80FD\u636E\u6B64\u8BA1\u7B97\u5408\u6210\u91CF\uFF0C\u4E5F\u4E0D\u5EFA\u8BAE\u4E3A\u4E86\u8865 D \u66B4\u6652\u3002"),
      training_detail: reused("training_detail", "\u8FD0\u52A8\u4E0E\u6062\u590D", { title: "\u4F60\u7684\u8FD0\u52A8\u5B89\u6392\u662F\u600E\u6837\u7684\uFF1F", helper: "\u6CA1\u6709\u89C4\u5F8B\u8FD0\u52A8\u4E5F\u53EF\u4EE5\u76F4\u63A5\u8BF4\u660E\u3002", fields: [
        ...legacy.QUESTIONS.training_detail.fields,
        field("stable", "\u8FD9\u79CD\u8BAD\u7EC3\u5B89\u6392\u6301\u7EED\u591A\u4E45\uFF1F", [["new", "\u4E0D\u8DB3 4 \u5468"], ["stable", "4 \u5468\u6216\u66F4\u4E45"], ["none", "\u6682\u65E0\u89C4\u5F8B\u8BAD\u7EC3"]]),
        field("sweat", "\u662F\u5426\u957F\u65F6\u95F4\u660E\u663E\u51FA\u6C57\u4E14\u4E0D\u65B9\u4FBF\u8FDB\u9910\uFF1F", [["no", "\u901A\u5E38\u4E0D\u4F1A"], ["yes", "\u4F1A\uFF0C\u5E38\u6301\u7EED 2 \u5C0F\u65F6\u4EE5\u4E0A"], ["unknown", "\u4E0D\u786E\u5B9A"]])
      ], why: "\u8BAD\u7EC3\u9891\u7387\u3001\u7C7B\u578B\u4E0E\u8FDB\u98DF\u6761\u4EF6\u51B3\u5B9A\u808C\u9178\u3001\u86CB\u767D\u8D28\u6216\u8865\u6DB2\u662F\u5426\u503C\u5F97\u8003\u8651\u3002" }),
      sleep_detail: reused("sleep_detail", "\u4E0E\u4F60\u6709\u5173\u7684\u7EC6\u8282", { title: "\u4F60\u7684\u7761\u7720\u4E3B\u8981\u5361\u5728\u54EA\u91CC\uFF1F", description: "", helper: "\u53EF\u591A\u9009\u3002", why: "\u5165\u7761\u6162\u3001\u591C\u9192\u548C\u7761\u7720\u65F6\u95F4\u88AB\u6324\u5360\uFF0C\u9700\u8981\u4E0D\u540C\u7684\u6539\u5584\u65B9\u5F0F\u3002" }),
      sleep_context: fields("sleep_context", "\u518D\u4E86\u89E3\u4E00\u70B9\u7761\u7720\u4E60\u60EF", [field("hours", "\u901A\u5E38\u6BCF\u665A\u7761\u591A\u4E45\uFF1F", [["short", "\u5C11\u4E8E 6 \u5C0F\u65F6"], ["middle", "6\u20137 \u5C0F\u65F6"], ["enough", "7 \u5C0F\u65F6\u4EE5\u4E0A"], ["unknown", "\u8BF4\u4E0D\u6E05"]]), field("frequency", "\u56F0\u6270\u6BCF\u5468\u53D1\u751F\u51E0\u5929\uFF1F", [["rare", "0\u20131 \u5929"], ["some", "2\u20133 \u5929"], ["often", "4 \u5929\u6216\u66F4\u591A"]]), field("duration", "\u6301\u7EED\u591A\u4E45\uFF1F", [["short", "\u4E0D\u5230 1 \u4E2A\u6708"], ["months", "1\u20133 \u4E2A\u6708"], ["long", "\u8D85\u8FC7 3 \u4E2A\u6708"]]), field("interference", "\u54EA\u4E9B\u60C5\u51B5\u7ECF\u5E38\u53D1\u751F\uFF1F", [["caffeine", "\u4E0B\u5348\u6216\u665A\u4E0A\u559D\u5496\u5561\u3001\u6D53\u8336"], ["care", "\u5E26\u5A03\u6216\u7167\u62A4\u5BFC\u81F4\u591C\u9192"], ["shift", "\u8F6E\u73ED\u6216\u8DE8\u65F6\u533A"], ["alcohol", "\u7761\u524D\u996E\u9152"], ["snoring", "\u660E\u663E\u6253\u9F3E\u3001\u618B\u9192\u6216\u56F0\u5230\u5F71\u54CD\u9A7E\u9A76"], ["none", "\u4EE5\u4E0A\u90FD\u6CA1\u6709"]], "multi")], "\u4F60\u7684\u76EE\u6807"),
      impact: reused("impact", "\u4F60\u7684\u76EE\u6807", { helper: "\u6309\u4F60\u7684\u771F\u5B9E\u611F\u53D7\u9009\u62E9\u3002" }),
      goal_detail: fields("goal_detail", "\u628A\u4F60\u5173\u5FC3\u7684\u53D8\u5316\u8BF4\u5F97\u66F4\u5177\u4F53", [field("skin", "\u76AE\u80A4\u6216\u5934\u53D1\u4E3B\u8981\u5173\u6CE8\u4EC0\u4E48\uFF1F", [["appearance", "\u5E72\u71E5\u3001\u5F39\u6027\u7B49\u5916\u89C2"], ["hair", "\u6301\u7EED\u8131\u53D1\u6216\u6307\u7532\u53D8\u5316"], ["sudden", "\u7A81\u7136 / \u6210\u7247\u8131\u53D1\u3001\u660E\u663E\u76AE\u75B9"], ["none", "\u4E0D\u5173\u6CE8\u8FD9\u65B9\u9762"]]), field("eyes", "\u773C\u775B\u4E3B\u8981\u662F\u4EC0\u4E48\u60C5\u51B5\uFF1F", [["screen", "\u957F\u65F6\u95F4\u7528\u773C\uFF0C\u60F3\u6539\u5584\u4F11\u606F"], ["discomfort", "\u6301\u7EED\u5E72\u6DA9\u6216\u89C6\u7269\u4E0D\u6E05"], ["diagnosed", "\u773C\u79D1\u5DF2\u6709\u660E\u786E\u8BCA\u65AD"], ["acute", "\u7A81\u7136\u89C6\u529B\u4E0B\u964D\u6216\u5267\u70C8\u773C\u75DB"], ["none", "\u4E0D\u5173\u6CE8\u8FD9\u65B9\u9762"]]), field("gut", "\u6392\u4FBF\u6216\u6D88\u5316\u66F4\u50CF\u54EA\u4E00\u79CD\uFF1F", [["constipation", "\u6392\u4FBF\u4E0D\u89C4\u5F8B\u6216\u504F\u5E72"], ["bloating", "\u5BB9\u6613\u80C0\u6C14"], ["diarrhea", "\u6301\u7EED\u6216\u53CD\u590D\u8179\u6CFB"], ["alarm", "\u4FBF\u8840\u3001\u9ED1\u4FBF\u3001\u660E\u663E\u8179\u75DB\u6216\u4E0D\u660E\u539F\u56E0\u6D88\u7626"], ["none", "\u4E0D\u5173\u6CE8\u8FD9\u65B9\u9762"]])], "\u4F60\u7684\u76EE\u6807"),
      menstrual: single("menstrual", "\u6708\u7ECF\u65B9\u9762\uFF0C\u6709\u6CA1\u6709\u9700\u8981\u7559\u610F\u7684\u53D8\u5316\uFF1F", [["usual", "\u6709\u6708\u7ECF\uFF0C\u51FA\u8840\u91CF\u548C\u5E73\u65F6\u76F8\u8FD1"], ["heavy", "\u7ECF\u91CF\u660E\u663E\u591A\u3001\u7ECF\u671F\u957F\u6216\u66FE\u88AB\u63D0\u9192\u5931\u8840\u591A"], ["none", "\u6CA1\u6709\u6708\u7ECF / \u4E0D\u9002\u7528"], ["unknown", "\u4E0D\u786E\u5B9A / \u4E0D\u60F3\u8BF4\u660E"]], "\u8425\u517B\u80CC\u666F"),
      labs: multi("labs", "\u8FD1\u4E00\u5E74\uFF0C\u533B\u751F\u6709\u6CA1\u6709\u544A\u77E5\u8FD9\u4E9B\u68C0\u67E5\u7ED3\u679C\uFF1F", [["d_low", "\u7EF4\u751F\u7D20 D \u504F\u4F4E"], ["iron_low", "\u7F3A\u94C1\u6216\u7F3A\u94C1\u6027\u8D2B\u8840"], ["b12_low", "B12 \u504F\u4F4E"], ["potassium_abnormal", "\u8840\u94BE\u5F02\u5E38"], ["calcium_abnormal", "\u8840\u9499\u5F02\u5E38"], ["none", "\u505A\u8FC7\u68C0\u67E5\uFF0C\u672A\u88AB\u544A\u77E5\u8FD9\u4E9B\u5F02\u5E38"], ["unknown", "\u6CA1\u505A\u8FC7 / \u4E0D\u6E05\u695A"]], "\u8425\u517B\u80CC\u666F", "\u6CA1\u6709\u68C0\u67E5\u8FC7\u548C\u68C0\u67E5\u6B63\u5E38\u4E0D\u540C\uFF1B\u8FD9\u91CC\u53EA\u8BB0\u5F55\u5DF2\u6709\u7ED3\u8BBA\u3002"),
      existing_sources: reused("existing_sources", "\u4F60\u7684\u8865\u5145\u5B89\u6392", { title: "\u4F60\u5DF2\u7ECF\u5728\u89C4\u5F8B\u8865\u5145\u54EA\u4E9B\u6210\u5206\uFF1F", helper: "\u53EA\u8BB0\u5F55\u5DF2\u77E5\u7C7B\u522B\uFF0C\u907F\u514D\u91CD\u590D\u5EFA\u8BAE\uFF1B\u5B8C\u6574\u67E5\u91CD\u4ECD\u5728\u5BB6\u5EAD\u8865\u5242\u67DC\u91CC\u505A\u3002", options: [...INTAKE_QUESTIONS.existing_sources.options, { id: "creatine", label: "\u808C\u9178" }, { id: "protein", label: "\u86CB\u767D\u7C89" }] }),
      preferences: fields("preferences", "\u4F60\u66F4\u613F\u610F\u600E\u6837\u5F00\u59CB\uFF1F", [
        field("approach", "\u996E\u98DF\u548C\u8865\u5145\u5242\uFF0C\u4F60\u503E\u5411\u4E8E", [["food", "\u5148\u8C03\u6574\u996E\u98DF"], ["if_needed", "\u98DF\u7269\u505A\u4E0D\u5230\u65F6\u518D\u8865\u5145"], ["both", "\u4E24\u79CD\u65B9\u5F0F\u90FD\u80FD\u63A5\u53D7"]]),
        field("fish", "\u5982\u679C\u9C7C\u5403\u5F97\u5C11\uFF0C\u4F60\u613F\u610F\u589E\u52A0\u5417\uFF1F", [["yes", "\u613F\u610F\uFF0C\u5B89\u6392\u8FDB\u6BCF\u5468\u9910\u5355"], ["no", "\u957F\u671F\u4E0D\u5403 / \u4E0D\u65B9\u4FBF"], ["unknown", "\u8FD8\u6CA1\u60F3\u597D"]]),
        field("calcium", "\u6BCF\u5929\u5B89\u6392\u4E00\u79CD\u53EF\u9760\u542B\u9499\u98DF\u7269\uFF0C\u505A\u5F97\u5230\u5417\uFF1F", [["yes", "\u53EF\u4EE5\u5C1D\u8BD5\u5976\u6216\u5408\u9002\u7684\u66FF\u4EE3\u98DF\u7269"], ["no", "\u76EE\u524D\u5F88\u96BE\u505A\u5230"], ["unknown", "\u8FD8\u6CA1\u60F3\u597D"]])
      ], "\u4F60\u7684\u8865\u5145\u5B89\u6392", "\u80FD\u6267\u884C\u7684\u98DF\u7269\u8C03\u6574\u4F18\u5148\uFF1B\u4E0D\u65B9\u4FBF\u5403\u5230\u65F6\uFF0C\u518D\u8BA8\u8BBA\u8865\u5145\u5F62\u5F0F\u3002")
    };
    var MODES = {
      quick: { id: "quick", title: "\u6781\u7B80\u7248", timeLabel: "\u7EA6 3\u20135 \u5206\u949F", estimatedMinutes: [3, 5], stepLabel: "\u5173\u952E\u6765\u6E90 \xB7 \u5C11\u91CF\u76F8\u5173\u8FFD\u95EE", description: "\u5FEB\u901F\u627E\u5230\u503C\u5F97\u5148\u5173\u6CE8\u7684\u8425\u517B\uFF0C\u4EE5\u53CA\u5BB9\u6613\u505A\u5230\u7684\u996E\u98DF\u8C03\u6574\u3002" },
      detailed: { id: "detailed", title: "\u8BE6\u7EC6\u7248", timeLabel: "\u7EA6 12\u201318 \u5206\u949F", estimatedMinutes: [12, 18], stepLabel: "\u5B8C\u6574\u996E\u98DF \xB7 \u6309\u56DE\u7B54\u5C55\u5F00", description: "\u7EC6\u770B\u98DF\u7269\u4EFD\u91CF\u3001\u66FF\u4EE3\u6765\u6E90\u3001\u7761\u7720\u548C\u8BAD\u7EC3\uFF0C\u8BA9\u6BCF\u4E00\u9879\u5EFA\u8BAE\u90FD\u6709\u4F9D\u636E\u3002" }
    };
    module.exports = { QUESTIONS: QUESTIONS2, MODES, QUESTION_IDS: legacy.QUESTION_IDS, OPTION_IDS: legacy.OPTION_IDS, getModeDefinition: (mode) => MODES[mode] || MODES.quick };
  }
});

// resources/bubu-source/engine/intake-screening.js
var require_intake_screening = __commonJS({
  "resources/bubu-source/engine/intake-screening.js"(exports, module) {
    "use strict";
    var { INTAKE_QUESTIONS } = require_intake_questions();
    var list = (value) => Array.isArray(value) ? value : [];
    var has = (value, id) => list(value).includes(id);
    var sourceUrl = (slug) => `https://ods.od.nih.gov/factsheets/${slug}-Consumer/`;
    var NUTRIENTS2 = [
      ["vitamin_d", "\u7EF4\u751F\u7D20 D", "vitamins", "VitaminD", ["fish", "d_fortified"], "\u53C2\u4E0E\u9499\u5438\u6536\u4E0E\u9AA8\u9ABC\u5065\u5EB7\u3002", "\u5BCC\u8102\u9C7C\u3001\u660E\u786E\u5F3A\u5316\u7EF4\u751F\u7D20 D \u7684\u98DF\u54C1"],
      ["vitamin_a", "\u7EF4\u751F\u7D20 A", "vitamins", "VitaminA", ["greens", "orange", "milk", "eggs"], "\u7EF4\u6301\u6B63\u5E38\u89C6\u89C9\u3001\u76AE\u80A4\u548C\u9ECF\u819C\u529F\u80FD\u3002", "\u6DF1\u7EFF\u53F6\u83DC\u3001\u6A59\u9EC4\u8272\u852C\u83DC\u3001\u86CB\u548C\u5976"],
      ["vitamin_c", "\u7EF4\u751F\u7D20 C", "vitamins", "VitaminC", ["vegetables", "fruit"], "\u53C2\u4E0E\u80F6\u539F\u5408\u6210\uFF0C\u4E5F\u5E2E\u52A9\u975E\u8840\u7EA2\u7D20\u94C1\u5438\u6536\u3002", "\u751C\u6912\u3001\u7315\u7334\u6843\u3001\u67D1\u6A58\u548C\u5176\u4ED6\u852C\u679C"],
      ["vitamin_e", "\u7EF4\u751F\u7D20 E", "vitamins", "VitaminE", ["nuts", "oil"], "\u53C2\u4E0E\u4FDD\u62A4\u7EC6\u80DE\u514D\u53D7\u6C27\u5316\u635F\u4F24\u3002", "\u575A\u679C\u3001\u79CD\u5B50\u548C\u9002\u91CF\u690D\u7269\u6CB9"],
      ["vitamin_k", "\u7EF4\u751F\u7D20 K", "vitamins", "VitaminK", ["greens", "oil", "vegetables"], "\u53C2\u4E0E\u6B63\u5E38\u51DD\u8840\u548C\u9AA8\u76F8\u5173\u86CB\u767D\u7684\u529F\u80FD\u3002", "\u7EFF\u53F6\u83DC\u3001\u690D\u7269\u6CB9\u7B49"],
      ["b1", "\u7EF4\u751F\u7D20 B1", "vitamins", "Thiamin", ["whole_grains", "beans", "meat"], "\u53C2\u4E0E\u98DF\u7269\u80FD\u91CF\u5229\u7528\u548C\u6B63\u5E38\u795E\u7ECF\u529F\u80FD\u3002", "\u5168\u8C37\u3001\u8C46\u7C7B\u548C\u7626\u732A\u8089"],
      ["b2", "\u7EF4\u751F\u7D20 B2", "vitamins", "Riboflavin", ["milk", "eggs", "meat", "greens"], "\u53C2\u4E0E\u7EC6\u80DE\u751F\u957F\u4E0E\u80FD\u91CF\u4EE3\u8C22\u3002", "\u5976\u3001\u86CB\u3001\u7626\u8089\u548C\u90E8\u5206\u7EFF\u53F6\u83DC"],
      ["b3", "\u7EF4\u751F\u7D20 B3\uFF08\u70DF\u9178\uFF09", "vitamins", "Niacin", ["meat", "fish", "whole_grains", "beans", "nuts"], "\u53C2\u4E0E\u80FD\u91CF\u4EE3\u8C22\uFF1B\u8EAB\u4F53\u4E5F\u53EF\u5229\u7528\u8272\u6C28\u9178\u5408\u6210\u4E00\u90E8\u5206\u3002", "\u8089\u3001\u9C7C\u3001\u5168\u8C37\u3001\u8C46\u7C7B\u548C\u575A\u679C"],
      ["b5", "\u7EF4\u751F\u7D20 B5\uFF08\u6CDB\u9178\uFF09", "vitamins", "PantothenicAcid", ["meat", "eggs", "whole_grains", "vegetables", "beans"], "\u53C2\u4E0E\u8102\u80AA\u7B49\u8425\u517B\u7269\u8D28\u7684\u4EE3\u8C22\u3002", "\u591A\u79CD\u8089\u3001\u86CB\u3001\u852C\u83DC\u3001\u5168\u8C37\u548C\u8C46\u7C7B"],
      ["b6", "\u7EF4\u751F\u7D20 B6", "vitamins", "VitaminB6", ["meat", "fish", "potato", "fruit"], "\u53C2\u4E0E\u6C28\u57FA\u9178\u4EE3\u8C22\u548C\u795E\u7ECF\u9012\u8D28\u5408\u6210\u3002", "\u79BD\u8089\u3001\u9C7C\u3001\u85AF\u7C7B\u53CA\u90E8\u5206\u6C34\u679C"],
      ["b7", "\u751F\u7269\u7D20\uFF08B7\uFF09", "vitamins", "Biotin", ["eggs", "meat", "nuts", "vegetables"], "\u53C2\u4E0E\u78B3\u6C34\u5316\u5408\u7269\u3001\u8102\u80AA\u548C\u86CB\u767D\u8D28\u4EE3\u8C22\u3002", "\u719F\u86CB\u3001\u8089\u3001\u575A\u679C\u79CD\u5B50\u548C\u90E8\u5206\u852C\u83DC"],
      ["b9", "\u53F6\u9178\uFF08B9\uFF09", "vitamins", "Folate", ["greens", "beans", "fruit"], "\u53C2\u4E0E DNA \u5408\u6210\u548C\u7EC6\u80DE\u5206\u88C2\u3002", "\u6DF1\u7EFF\u53F6\u83DC\u3001\u8C46\u7C7B\u53CA\u67D1\u6A58\u7C7B\u6C34\u679C"],
      ["b12", "\u7EF4\u751F\u7D20 B12", "vitamins", "VitaminB12", ["meat", "fish", "milk", "eggs", "b12_fortified"], "\u53C2\u4E0E\u7EA2\u7EC6\u80DE\u5F62\u6210\u4E0E\u795E\u7ECF\u529F\u80FD\u3002", "\u52A8\u7269\u6027\u98DF\u7269\uFF0C\u6216\u660E\u786E\u5F3A\u5316 B12 \u7684\u98DF\u54C1"],
      ["calcium", "\u9499", "minerals", "Calcium", ["calcium_drink", "calcium_tofu", "greens"], "\u6784\u6210\u9AA8\u9ABC\u4E0E\u7259\u9F7F\uFF0C\u5E76\u53C2\u4E0E\u808C\u8089\u548C\u795E\u7ECF\u529F\u80FD\u3002", "\u5976\u3001\u5F3A\u5316\u9499\u996E\u54C1\u3001\u542B\u9499\u51DD\u56FA\u5242\u8C46\u8150\u548C\u90E8\u5206\u7EFF\u53F6\u83DC"],
      ["magnesium", "\u9541", "minerals", "Magnesium", ["whole_grains", "beans", "nuts", "greens", "tofu"], "\u53C2\u4E0E\u80FD\u91CF\u4EE3\u8C22\u4EE5\u53CA\u795E\u7ECF\u3001\u808C\u8089\u529F\u80FD\u3002", "\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u575A\u679C\u79CD\u5B50\u548C\u7EFF\u53F6\u83DC"],
      ["potassium", "\u94BE", "minerals", "Potassium", ["vegetables", "fruit", "beans", "potato", "milk"], "\u53C2\u4E0E\u6B63\u5E38\u5FC3\u810F\u3001\u795E\u7ECF\u548C\u808C\u8089\u529F\u80FD\u3002", "\u852C\u679C\u3001\u85AF\u7C7B\u3001\u8C46\u7C7B\u53CA\u5976\u7C7B"],
      ["iron", "\u94C1", "minerals", "Iron", ["meat", "beans", "greens"], "\u53C2\u4E0E\u8840\u7EA2\u86CB\u767D\u5F62\u6210\u548C\u6C27\u8FD0\u8F93\u3002", "\u8089\u7C7B\u3001\u8C46\u7C7B\u3001\u7EFF\u53F6\u83DC\uFF1B\u690D\u7269\u6765\u6E90\u53EF\u642D\u914D\u7EF4\u751F\u7D20 C \u98DF\u7269"],
      ["zinc", "\u950C", "minerals", "Zinc", ["meat", "seafood", "beans", "nuts", "milk"], "\u53C2\u4E0E\u6B63\u5E38\u514D\u75AB\u529F\u80FD\u3001\u86CB\u767D\u5408\u6210\u548C\u4F24\u53E3\u6108\u5408\u3002", "\u8089\u3001\u8D1D\u7C7B\u3001\u8C46\u7C7B\u3001\u575A\u679C\u548C\u5976\u7C7B"],
      ["iodine", "\u7898", "minerals", "Iodine", ["iodized_salt", "seafood", "milk", "eggs"], "\u7528\u4E8E\u5408\u6210\u7532\u72B6\u817A\u6FC0\u7D20\u3002", "\u52A0\u7898\u76D0\u3001\u90E8\u5206\u6D77\u4EA7\u54C1\u3001\u5976\u548C\u86CB"],
      ["selenium", "\u7852", "minerals", "Selenium", ["seafood", "meat", "eggs", "whole_grains"], "\u53C2\u4E0E\u7532\u72B6\u817A\u4EE3\u8C22\u548C\u6297\u6C27\u5316\u76F8\u5173\u9176\u7684\u529F\u80FD\u3002", "\u9C7C\u8D1D\u7C7B\u3001\u8089\u3001\u86CB\u53CA\u8C37\u7269\uFF1B\u542B\u91CF\u53D7\u4EA7\u5730\u5F71\u54CD"],
      ["copper", "\u94DC", "minerals", "Copper", ["nuts", "whole_grains", "seafood", "beans"], "\u53C2\u4E0E\u94C1\u4EE3\u8C22\u3001\u7ED3\u7F14\u7EC4\u7EC7\u548C\u591A\u79CD\u9176\u7684\u529F\u80FD\u3002", "\u575A\u679C\u79CD\u5B50\u3001\u5168\u8C37\u3001\u8D1D\u7C7B\u548C\u8C46\u7C7B"],
      ["manganese", "\u9530", "minerals", "Manganese", ["whole_grains", "nuts", "beans", "greens"], "\u53C2\u4E0E\u591A\u79CD\u4EE3\u8C22\u9176\u7684\u6B63\u5E38\u5DE5\u4F5C\u3002", "\u5168\u8C37\u3001\u575A\u679C\u3001\u8C46\u7C7B\u548C\u7EFF\u53F6\u83DC"],
      ["phosphorus", "\u78F7", "minerals", "Phosphorus", ["milk", "meat", "eggs", "beans", "whole_grains"], "\u53C2\u4E0E\u9AA8\u9ABC\u7ED3\u6784\u548C\u80FD\u91CF\u4EE3\u8C22\u3002", "\u5976\u3001\u8089\u3001\u86CB\u3001\u8C46\u7C7B\u548C\u8C37\u7269"],
      ["choline", "\u80C6\u78B1", "other", "Choline", ["eggs", "meat", "fish", "tofu", "beans"], "\u53C2\u4E0E\u7EC6\u80DE\u819C\u7ED3\u6784\u4E0E\u795E\u7ECF\u9012\u8D28\u5408\u6210\u3002", "\u86CB\u3001\u8089\u3001\u9C7C\u3001\u5927\u8C46\u5236\u54C1\u548C\u8C46\u7C7B"]
    ].map(([id, title, group, slug, foods, mechanism, sources]) => ({ id, title, group, slug, foods, mechanism, sources }));
    function assessIntake(answers = {}, safety = {}) {
      const portions = answers.daily_portions || {};
      const frequency = answers.food_frequency || {};
      const sources = answers.food_sources || {};
      const context = answers.nutrition_context || {};
      const existing = list(answers.existing_sources);
      const conditions = list((answers.health_detail || {}).conditions);
      const medicines = list((answers.health_detail || {}).medicines);
      const labs = list(context.labs);
      const vegan = has(answers.diet_pattern, "vegan");
      const professional = safety.status === "professional";
      const medicalRestriction = conditions.some((id) => ["kidney", "food_limit", "unknown"].includes(id)) || has(answers.diet_pattern, "medical_food_restriction") || has(answers.safety, "chronic_or_labs") && !conditions.length;
      const signals = {};
      const signal = (id, state, description) => {
        signals[id] = { id, state, description };
        return signals[id];
      };
      const portion = (id, title, sourceId = id) => {
        const row = INTAKE_QUESTIONS.daily_portions.rows.find((item) => item.id === id);
        const choice = row.choices.find((item) => item.id === portions[id]);
        return signal(
          sourceId,
          !choice || portions[id] === "unknown" ? "unknown" : ["zero", "small"].includes(portions[id]) ? "low" : "source",
          choice && portions[id] !== "unknown" ? `${title}\u6BCF\u5929${choice.label}` : `${title}\u7684\u4EFD\u91CF\u8FD8\u4E0D\u6E05\u695A`
        );
      };
      const weekly = (id, title, sourceId = id, lowIds = ["zero", "one_two"]) => {
        const value = frequency[id];
        const label = { zero: "0 \u5929", one_two: "1\u20132 \u5929", three_four: "3\u20134 \u5929", five_seven: "5\u20137 \u5929" }[value];
        return signal(sourceId, !label ? "unknown" : lowIds.includes(value) ? "low" : "source", label ? `${title}\u6BCF\u5468 ${label}` : `${title}\u7684\u9891\u7387\u8FD8\u4E0D\u6E05\u695A`);
      };
      portion("dairy", "\u5976\u6216\u690D\u7269\u996E\u54C1", "drink");
      portion("tofu", "\u8C46\u5236\u54C1");
      portion("beans", "\u6742\u8C46");
      portion("vegetables", "\u852C\u83DC");
      portion("fruit", "\u6C34\u679C");
      portion("whole_grains", "\u5168\u8C37");
      portion("nuts", "\u575A\u679C\u79CD\u5B50");
      portion("meat_fish", "\u8089\u79BD\u9C7C\u867E", "meat");
      portion("eggs", "\u86CB\u7C7B");
      weekly("dark_greens", "\u6DF1\u7EFF\u53F6\u83DC", "greens");
      weekly("orange_produce", "\u6A59\u9EC4\u8272\u852C\u679C", "orange");
      weekly("fatty_fish", "\u5BCC\u8102\u9C7C", "fish", ["zero"]);
      weekly("seafood", "\u5176\u4ED6\u9C7C\u867E\u8D1D\u7C7B", "seafood", ["zero"]);
      signal(
        "milk",
        sources.calcium_drink === "dairy" ? signals.drink.state : ["fortified", "unfortified", "none"].includes(sources.calcium_drink) ? "low" : "unknown",
        sources.calcium_drink === "dairy" ? signals.drink.description : "\u996E\u54C1\u4E0D\u662F\u660E\u786E\u7684\u4E73\u5236\u54C1\u6765\u6E90"
      );
      signal(
        "calcium_drink",
        ["dairy", "fortified"].includes(sources.calcium_drink) ? signals.drink.state : ["unfortified", "none"].includes(sources.calcium_drink) ? "low" : "unknown",
        ["dairy", "fortified"].includes(sources.calcium_drink) ? signals.drink.description : "\u6CA1\u6709\u786E\u8BA4\u89C4\u5F8B\u7684\u5976\u6216\u5F3A\u5316\u9499\u996E\u54C1\u6765\u6E90"
      );
      signal(
        "calcium_tofu",
        portions.tofu === "zero" ? "low" : sources.calcium_tofu === "calcium_set" ? signals.tofu.state : sources.calcium_tofu === "none" ? "low" : "unknown",
        sources.calcium_tofu === "calcium_set" ? `\u542B\u9499\u8C46\u8150\uFF1A${signals.tofu.description}` : "\u6CA1\u6709\u786E\u8BA4\u542B\u9499\u51DD\u56FA\u5242\u8C46\u8150\u7684\u6444\u5165\u91CF"
      );
      signal(
        "oil",
        sources.oil === "plant" ? "source" : ["animal_coconut", "very_little"].includes(sources.oil) ? "low" : "unknown",
        sources.oil === "plant" ? "\u65E5\u5E38\u4F7F\u7528\u690D\u7269\u6CB9" : "\u690D\u7269\u6CB9\u6765\u6E90\u8F83\u5C11\u6216\u7C7B\u578B\u4E0D\u6E05\u695A"
      );
      signal(
        "potato",
        !sources.potato || sources.potato === "unknown" ? "unknown" : ["zero", "one_two"].includes(sources.potato) ? "low" : "source",
        `\u85AF\u7C7B${{ zero: "\u6BCF\u5468 0 \u5929", one_two: "\u6BCF\u5468 1\u20132 \u5929", three_four: "\u6BCF\u5468 3\u20134 \u5929", five_seven: "\u6BCF\u5468 5\u20137 \u5929" }[sources.potato] || "\u9891\u7387\u4E0D\u6E05\u695A"}`
      );
      signal(
        "iodized_salt",
        sources.salt === "iodized" ? "source" : sources.salt === "non_iodized" ? "low" : "unknown",
        sources.salt === "iodized" ? "\u4E3B\u8981\u4F7F\u7528\u52A0\u7898\u76D0" : sources.salt === "non_iodized" ? "\u4E3B\u8981\u4F7F\u7528\u672A\u52A0\u7898\u76D0" : "\u8FD8\u4E0D\u6E05\u695A\u98DF\u76D0\u662F\u5426\u52A0\u7898"
      );
      const fortified = list(sources.fortified);
      for (const [id, key, label] of [["d_fortified", "vitamin_d", "\u7EF4\u751F\u7D20 D"], ["b12_fortified", "b12", "B12"]]) {
        signal(
          id,
          fortified.includes(key) ? "source" : !fortified.length || fortified.includes("unknown") ? "unknown" : "low",
          fortified.includes(key) ? `\u6709\u89C4\u5F8B\u6444\u5165\u660E\u786E\u5F3A\u5316 ${label} \u7684\u98DF\u54C1` : `\u5C1A\u672A\u786E\u8BA4\u89C4\u5F8B\u7684 ${label} \u5F3A\u5316\u98DF\u54C1\u6765\u6E90`
        );
      }
      if (has(answers.diet_pattern, "reliable_b12_source")) signal("b12_fortified", "source", "\u5DF2\u586B\u5199\u53EF\u9760\u7684 B12 \u6765\u6E90");
      if (vegan) {
        for (const id of ["meat", "milk", "eggs", "fish", "seafood"]) signal(id, "low", "\u7EAF\u7D20\u996E\u98DF\u4E0D\u5305\u542B\u52A8\u7269\u6027\u6765\u6E90");
      }
      const labels = { attention: "\u6765\u6E90\u504F\u5C11\uFF0C\u4F18\u5148\u5173\u6CE8", review: "\u8865\u5145\u4FE1\u606F\u540E\u518D\u5224\u65AD", sources: "\u6709\u98DF\u7269\u6765\u6E90", unknown: "\u4FE1\u606F\u8FD8\u4E0D\u591F", existing: "\u5DF2\u6709\u8865\u5145\uFF0C\u9700\u6838\u5BF9\u91CF", medical: "\u5DF2\u6709\u60C5\u51B5\u9700\u6838\u5BF9", variety: "\u5148\u5173\u6CE8\u996E\u98DF\u591A\u6837\u6027" };
      const low = (id) => signals[id].state === "low";
      const covered = (id) => signals[id].state === "source";
      const broadOnly = /* @__PURE__ */ new Set(["b3", "b5", "b7", "selenium", "copper", "manganese", "phosphorus", "choline"]);
      const nutrients = NUTRIENTS2.map((n) => {
        const evidence = n.foods.map((id) => signals[id]);
        const lows = evidence.filter((item) => item.state === "low");
        const known = evidence.filter((item) => item.state !== "unknown");
        let state = known.length < Math.ceil(evidence.length / 2) ? "unknown" : lows.length >= Math.max(2, Math.ceil(evidence.length * 0.75)) ? "attention" : evidence.some((item) => item.state === "source") ? "sources" : "review";
        let priority = 45;
        let reason = "";
        let action = `\u5728\u65E5\u5E38\u9910\u5355\u4E2D\u8F6E\u6362\u5B89\u6392${n.sources}\uFF0C\u5148\u6539\u5584\u6765\u6E90\u548C\u4EFD\u91CF\u3002`;
        let caution = "";
        if (n.id === "calcium") {
          state = low("calcium_drink") && low("calcium_tofu") ? "attention" : covered("calcium_drink") || covered("calcium_tofu") ? "sources" : low("calcium_drink") ? "review" : "unknown";
          priority = 86;
          action = "\u5148\u5EFA\u7ACB\u6BCF\u5929\u80FD\u575A\u6301\u7684\u542B\u9499\u6765\u6E90\u3002\u5976\u3001\u5F3A\u5316\u9499\u996E\u54C1\u548C\u542B\u9499\u8C46\u8150\u53EF\u6309\u996E\u98DF\u4E60\u60EF\u9009\u62E9\uFF1B\u8C03\u6574\u540E\u4ECD\u96BE\u8986\u76D6\uFF0C\u518D\u8003\u8651\u9499\u8865\u5145\u5242\u3002";
        }
        if (n.id === "vitamin_d") {
          const limited = ["very_little", "some"].includes(context.daylight);
          state = limited && low("fish") && low("d_fortified") ? "attention" : covered("d_fortified") ? "sources" : "review";
          if (!context.daylight && !known.length) state = "unknown";
          priority = 92;
          reason = state === "attention" ? "\u4F60\u767D\u5929\u6237\u5916\u63A5\u89E6\u8F83\u5C11\uFF0C\u6700\u8FD1\u4E00\u5468\u6CA1\u6709\u5403\u5BCC\u8102\u9C7C\uFF0C\u4E5F\u6CA1\u6709\u89C4\u5F8B\u7684\u7EF4\u751F\u7D20 D \u5F3A\u5316\u98DF\u54C1\u6765\u6E90\u3002" : "";
          action = "\u5148\u6838\u5BF9\u5F3A\u5316\u98DF\u54C1\u548C\u5DF2\u6709\u8865\u5145\u6765\u6E90\u3002\u996E\u98DF\u96BE\u4EE5\u7A33\u5B9A\u8986\u76D6\u65F6\uFF0C\u53EF\u8003\u8651\u7EF4\u751F\u7D20 D \u8865\u5145\uFF0C\u5E76\u6309\u5E74\u9F84\u4E0E\u5065\u5EB7\u60C5\u51B5\u786E\u8BA4\u5408\u9002\u7528\u91CF\u3002";
          caution = "\u4E0D\u9700\u8981\u4E3A\u4E86\u8865\u7EF4\u751F\u7D20 D \u66B4\u6652\uFF1B\u662F\u5426\u9700\u8981\u68C0\u6D4B\uFF0C\u5E94\u7ED3\u5408\u4E2A\u4EBA\u98CE\u9669\u5224\u65AD\u3002";
        }
        if (n.id === "b12") {
          state = covered("b12_fortified") ? "sources" : vegan && low("b12_fortified") ? "attention" : state;
          priority = 96;
          action = vegan ? "\u628A\u660E\u786E\u5F3A\u5316 B12 \u7684\u98DF\u54C1\u6216 B12 \u8865\u5145\u5242\u4F5C\u4E3A\u7A33\u5B9A\u6765\u6E90\uFF0C\u786E\u8BA4\u6807\u7B7E\u542B\u91CF\u4E0E\u4F7F\u7528\u5B89\u6392\u3002\u666E\u901A\u6D77\u85FB\u548C\u53D1\u9175\u98DF\u54C1\u4E0D\u80FD\u66FF\u4EE3\u3002" : "\u6838\u5BF9\u52A8\u7269\u6027\u98DF\u7269\u6216 B12 \u5F3A\u5316\u98DF\u54C1\u662F\u5426\u89C4\u5F8B\u6444\u5165\uFF1B\u96BE\u4EE5\u8986\u76D6\u65F6\u518D\u8003\u8651\u8865\u5145\u3002";
        }
        if (n.id === "magnesium") {
          priority = 72;
          action = "\u5148\u628A\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u575A\u679C\u548C\u7EFF\u53F6\u83DC\u5B89\u6392\u8FDB\u6B63\u9910\uFF1B\u957F\u671F\u96BE\u4EE5\u8986\u76D6\u65F6\u518D\u8003\u8651\u9541\u8865\u5145\u5242\uFF0C\u6807\u7B7E\u8981\u770B\u201C\u5143\u7D20\u9541\u201D\u542B\u91CF\u3002";
          caution = "\u8FD9\u91CC\u5173\u6CE8\u996E\u98DF\u4E2D\u7684\u9541\uFF0C\u4E0D\u628A\u7761\u4E0D\u597D\u76F4\u63A5\u5224\u65AD\u4E3A\u7F3A\u9541\u3002";
        }
        if (n.id === "potassium") {
          priority = 78;
          action = "\u4F18\u5148\u901A\u8FC7\u852C\u83DC\u3001\u6C34\u679C\u3001\u85AF\u7C7B\u3001\u8C46\u7C7B\u548C\u5976\u7C7B\u589E\u52A0\u94BE\u6765\u6E90\uFF0C\u4E0D\u628A\u94BE\u7247\u5F53\u4F5C\u5E38\u89C4\u8425\u517B\u8865\u5145\u3002";
          caution = "\u81B3\u98DF\u94BE\u6765\u6E90\u5C11\u4E0D\u7B49\u4E8E\u4F4E\u8840\u94BE\uFF1B\u8840\u94BE\u9700\u8981\u5316\u9A8C\u5224\u65AD\u3002";
        }
        if (n.id === "iron") {
          priority = 68;
          if (context.menstrual === "heavy") {
            state = "medical";
            priority = 99;
            reason = "\u4F60\u63D0\u5230\u7ECF\u91CF\u8F83\u591A\u6216\u7ECF\u671F\u8F83\u957F\uFF0C\u503C\u5F97\u628A\u5931\u8840\u60C5\u51B5\u4E0E\u94C1\u72B6\u6001\u4E00\u8D77\u8BC4\u4F30\u3002";
          }
          action = "\u98DF\u7269\u4E0A\u5B89\u6392\u5408\u9002\u7684\u542B\u94C1\u6765\u6E90\uFF1B\u82E5\u7ECF\u91CF\u591A\u3001\u5DF2\u6709\u8D2B\u8840\u6216\u6301\u7EED\u4E0D\u9002\uFF0C\u4E0E\u533B\u751F\u8BA8\u8BBA\u8840\u5E38\u89C4\u3001\u94C1\u86CB\u767D\u7B49\u68C0\u67E5\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u8865\u94C1\u3002";
          caution = "\u4E0D\u8981\u4EC5\u51ED\u75B2\u52B3\u3001\u8131\u53D1\u6216\u98DF\u7269\u9891\u7387\u81EA\u884C\u52A0\u7528\u94C1\u5242\u3002";
        }
        if (n.id === "iodine") {
          priority = 65;
          action = "\u5148\u6838\u5BF9\u98DF\u76D0\u662F\u5426\u52A0\u7898\u548C\u5176\u4ED6\u98DF\u7269\u6765\u6E90\uFF0C\u4E0D\u4E3A\u4E86\u8865\u7898\u589E\u52A0\u76D0\u91CF\uFF0C\u4E5F\u4E0D\u7528\u6D77\u5E26\u6216\u7898\u7247\u81EA\u884C\u52A0\u91CF\u3002";
        }
        if (n.id === "vitamin_a") caution = "\u4F18\u5148\u6539\u5584\u98DF\u7269\u6765\u6E90\uFF1B\u4E0D\u56E0\u76AE\u80A4\u6216\u7528\u773C\u9700\u6C42\u81EA\u884C\u589E\u52A0\u9AD8\u5242\u91CF\u7EF4\u751F\u7D20 A\u3001\u9C7C\u809D\u6CB9\u3002";
        if (n.id === "b6") caution = "\u4E0D\u5EFA\u8BAE\u957F\u671F\u81EA\u884C\u4F7F\u7528\u9AD8\u5242\u91CF B6\uFF1B\u8FC7\u91CF\u53EF\u80FD\u635F\u4F24\u5468\u56F4\u795E\u7ECF\u3002";
        if (n.id === "b7") caution = "\u9AD8\u5242\u91CF\u751F\u7269\u7D20\u4F1A\u5E72\u6270\u90E8\u5206\u5316\u9A8C\uFF1B\u62BD\u8840\u524D\u8BF7\u544A\u77E5\u533B\u62A4\u4EBA\u5458\u3002";
        if (broadOnly.has(n.id) && state === "attention") state = "variety";
        const directSupplement = existing.includes(n.id) || n.id.startsWith("b") && /^b\d+$/.test(n.id) && existing.includes("b_complex");
        const possibleSupplement = directSupplement || existing.includes("multivitamin") || existing.includes("unknown") || existing.includes("other");
        if (possibleSupplement && state !== "medical") {
          state = "existing";
          priority = 20;
          reason = directSupplement ? `\u4F60\u5DF2\u7ECF\u5728\u8865\u5145${n.title}\u3002\u996E\u98DF\u6765\u6E90\u4E4B\u5916\uFF0C\u8FD8\u9700\u8981\u770B\u6E05\u73B0\u6709\u4EA7\u54C1\u7684\u5B9E\u9645\u542B\u91CF\u4E0E\u670D\u7528\u9891\u7387\u3002` : "\u4F60\u5DF2\u7ECF\u5728\u4F7F\u7528\u5176\u4ED6\u6216\u590D\u5408\u8425\u517B\u8865\u5145\u54C1\uFF0C\u9700\u8981\u5148\u6838\u5BF9\u662F\u5426\u542B\u6709\u8FD9\u4E00\u9879\uFF0C\u4EE5\u53CA\u5B9E\u9645\u542B\u91CF\u3002";
          action = "\u5148\u6838\u5BF9\u73B0\u6709\u4EA7\u54C1\u7684\u6210\u5206\u3001\u6BCF\u4EFD\u542B\u91CF\u548C\u5B9E\u9645\u5403\u6CD5\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u9700\u8981\u65B0\u589E\uFF1B\u4E0D\u8981\u4EC5\u6839\u636E\u8FD9\u4EFD\u95EE\u5377\u53E0\u52A0\u3002";
        } else if (!existing.length && state === "attention") {
          state = "review";
          reason = "\u996E\u98DF\u4E2D\u6709\u6765\u6E90\u504F\u5C11\u7684\u7EBF\u7D22\uFF0C\u4F46\u8FD8\u6CA1\u6709\u586B\u5199\u5DF2\u6709\u8865\u5145\u6765\u6E90\uFF0C\u6682\u65F6\u4E0D\u80FD\u5B8C\u6574\u6392\u5E8F\u3002";
        }
        const abnormal = { vitamin_d: "d_low", iron: "iron_low", b12: "b12_low", potassium: "potassium_abnormal", calcium: "calcium_abnormal" }[n.id];
        if (abnormal && labs.includes(abnormal)) {
          state = "medical";
          priority = 110;
          reason = `\u4F60\u586B\u5199\u4E86\u533B\u751F\u5DF2\u544A\u77E5\u7684${n.title}\u76F8\u5173\u5F02\u5E38\uFF0C\u73B0\u6709\u7ED3\u679C\u6BD4\u996E\u98DF\u95EE\u5377\u66F4\u503C\u5F97\u4F18\u5148\u8DDF\u8FDB\u3002`;
          action = "\u6309\u7167\u5DF2\u6709\u68C0\u67E5\u7ED3\u679C\u4E0E\u533B\u751F\u786E\u8BA4\u5904\u7406\u548C\u590D\u67E5\u5B89\u6392\uFF0C\u4E0D\u81EA\u884C\u8FFD\u52A0\u6216\u505C\u7528\u6B63\u5728\u4F7F\u7528\u7684\u8865\u5145\u5242\u3002";
        }
        if (n.id === "potassium" && (medicalRestriction || medicines.includes("potassium_affecting") || has(answers.safety, "medication") && (medicines.includes("unknown") || !medicines.length))) {
          state = "medical";
          priority = 108;
          reason = "\u4F60\u586B\u5199\u7684\u80BE\u810F\u3001\u996E\u98DF\u9650\u5236\u6216\u7528\u836F\u60C5\u51B5\u53EF\u80FD\u5F71\u54CD\u8840\u94BE\uFF0C\u9700\u8981\u5148\u786E\u8BA4\u9002\u5408\u7684\u94BE\u6444\u5165\u5B89\u6392\u3002";
          action = "\u5148\u8BA9\u533B\u751F\u6838\u5BF9\u8840\u94BE\u3001\u80BE\u529F\u80FD\u4E0E\u836F\u7269\uFF1B\u4E0D\u8981\u81EA\u884C\u52A0\u94BE\u7247\u3001\u6539\u7528\u542B\u94BE\u4F4E\u94A0\u76D0\uFF0C\u6216\u523B\u610F\u589E\u52A0\u9AD8\u94BE\u98DF\u7269\u3002";
        }
        if (n.id === "vitamin_k" && medicines.includes("warfarin")) {
          state = "medical";
          priority = 106;
          reason = "\u4F60\u6B63\u5728\u4F7F\u7528\u534E\u6CD5\u6797\uFF0C\u7EF4\u751F\u7D20 K \u7684\u6444\u5165\u7A33\u5B9A\u6027\u6BD4\u7A81\u7136\u589E\u52A0\u6216\u51CF\u5C11\u66F4\u91CD\u8981\u3002";
          action = "\u4FDD\u6301\u65E5\u5E38\u996E\u98DF\u76F8\u5BF9\u7A33\u5B9A\uFF0C\u8C03\u6574\u7EFF\u53F6\u83DC\u6444\u5165\u6216\u4F7F\u7528\u542B K \u8865\u5145\u5242\u524D\uFF0C\u5148\u4E0E\u7BA1\u7406\u7528\u836F\u7684\u533B\u751F\u786E\u8BA4\u3002";
        }
        if (n.id === "iodine" && conditions.includes("thyroid")) {
          state = "medical";
          priority = 105;
          reason = "\u4F60\u63D0\u5230\u7532\u72B6\u817A\u76F8\u5173\u75BE\u75C5\uFF0C\u662F\u5426\u9700\u8981\u8C03\u6574\u7898\u6444\u5165\u5E94\u7ED3\u5408\u5177\u4F53\u75C5\u60C5\u3002";
          action = "\u5148\u786E\u8BA4\u533B\u751F\u7ED9\u51FA\u7684\u7898\u6444\u5165\u8981\u6C42\uFF0C\u4E0D\u81EA\u884C\u52A0\u7898\u7247\u3001\u6D77\u85FB\u8865\u5145\u5242\u6216\u6539\u53D8\u73B0\u6709\u996E\u98DF\u5B89\u6392\u3002";
        }
        if (n.id === "b12" && medicines.includes("b12_affecting") && state !== "medical") {
          state = "medical";
          priority = 98;
          reason = "\u4F60\u63D0\u5230\u957F\u671F\u4F7F\u7528\u4E8C\u7532\u53CC\u80CD\u6216\u6291\u9178\u836F\uFF0C\u90E8\u5206\u60C5\u51B5\u4E0B\u53EF\u80FD\u5F71\u54CD B12 \u72B6\u6001\u3002";
          action = "\u5411\u5F00\u836F\u533B\u751F\u8BE2\u95EE\u662F\u5426\u9700\u8981\u8BC4\u4F30 B12\uFF1B\u4E0D\u8981\u81EA\u884C\u505C\u836F\uFF0C\u4E5F\u4E0D\u8981\u4EC5\u51ED\u7528\u836F\u5C31\u786E\u5B9A\u81EA\u5DF1\u7F3A\u4E4F\u3002";
        }
        if (n.id === "vitamin_a" && medicines.includes("retinoids")) {
          state = "medical";
          priority = 103;
          reason = "\u4F60\u6B63\u5728\u4F7F\u7528\u7EF4 A \u9178\u7C7B\u836F\u7269\uFF0C\u989D\u5916\u8865\u5145\u7EF4\u751F\u7D20 A \u53EF\u80FD\u589E\u52A0\u4E0D\u826F\u53CD\u5E94\u98CE\u9669\u3002";
          action = "\u4E0D\u8981\u81EA\u884C\u52A0\u7528\u7EF4\u751F\u7D20 A \u6216\u9C7C\u809D\u6CB9\uFF1B\u628A\u5DF2\u6709\u8865\u5145\u54C1\u4EA4\u7ED9\u5F00\u836F\u533B\u751F\u6838\u5BF9\u3002";
        }
        if (n.id === "b9" && has(answers.safety, "pregnant_or_lactating")) {
          state = "medical";
          priority = 104;
          reason = "\u4F60\u5904\u4E8E\u5907\u5B55\u3001\u5B55\u671F\u6216\u54FA\u4E73\u9636\u6BB5\uFF0C\u53F6\u9178\u5B89\u6392\u9700\u8981\u7ED3\u5408\u5177\u4F53\u9636\u6BB5\u548C\u5DF2\u6709\u4EA7\u54C1\u3002";
          action = "\u628A\u5F53\u524D\u5B55\u671F\u8425\u517B\u54C1\u6216\u53F6\u9178\u4EA7\u54C1\u5E26\u7ED9\u4EA7\u79D1\u533B\u751F\uFF0C\u786E\u8BA4\u662F\u5426\u9002\u5408\u5F53\u524D\u9636\u6BB5\u53CA\u5982\u4F55\u7EE7\u7EED\u4F7F\u7528\u3002";
        }
        if (medicalRestriction && state === "attention") {
          action = `\u628A${n.title}\u7684\u8FD9\u4E9B\u98DF\u7269\u6765\u6E90\u8BB0\u5F55\u4EA4\u7ED9\u719F\u6089\u4F60\u60C5\u51B5\u7684\u533B\u751F\u6216\u8425\u517B\u5E08\uFF0C\u5148\u786E\u8BA4\u53EF\u8C03\u6574\u7684\u79CD\u7C7B\u548C\u4EFD\u91CF\uFF1B\u4E0D\u76F4\u63A5\u589E\u52A0\u53D7\u9650\u5236\u7684\u98DF\u7269\u3002`;
        } else if (professional && state === "attention") {
          action = `\u7ED3\u5408${n.sources}\u6838\u5BF9\u65E5\u5E38\u6765\u6E90\uFF1B\u5982\u8003\u8651\u8865\u5145\u5242\uFF0C\u5148\u8BA9\u533B\u751F\u6216\u836F\u5E08\u7ED3\u5408\u5E74\u9F84\u3001\u7528\u836F\u4E0E\u5065\u5EB7\u60C5\u51B5\u786E\u8BA4\u9002\u7528\u6027\u3002`;
        }
        if (!reason) {
          const descriptions = (state === "attention" || state === "variety" ? lows : known).map((item) => item.description);
          reason = descriptions.length ? Array.from(new Set(descriptions)).join("\uFF1B") + "\u3002" : "\u76F8\u5173\u98DF\u7269\u7684\u4EFD\u91CF\u3001\u79CD\u7C7B\u6216\u5F3A\u5316\u60C5\u51B5\u8FD8\u6CA1\u6709\u786E\u8BA4\u3002";
        }
        if (state === "sources") action = "\u4FDD\u7559\u8FD9\u4E9B\u98DF\u7269\u6765\u6E90\uFF1B\u76EE\u524D\u53EA\u786E\u8BA4\u201C\u6709\u6765\u6E90\u201D\uFF0C\u5C1A\u672A\u6838\u7B97\u5168\u5929\u6444\u5165\u662F\u5426\u8FBE\u5230\u9700\u8981\u3002";
        if (state === "unknown" || state === "review") action = `\u8865\u5145\u8BB0\u5F55${n.sources}\u7684\u5B9E\u9645\u4EFD\u91CF\u3001\u9891\u7387\u548C\u6807\u7B7E\uFF0C\u518D\u5224\u65AD\u662F\u5426\u9700\u8981\u8C03\u6574\u3002`;
        if (state === "variety") action = `\u5148\u6539\u5584\u6574\u4F53\u996E\u98DF\u79CD\u7C7B\u4E0E\u4EFD\u91CF\uFF1B${n.title}\u4E0D\u56E0\u8FD9\u4EFD\u7B80\u5316\u6765\u6E90\u7B5B\u67E5\u800C\u5355\u72EC\u5B89\u6392\u8865\u5145\u5242\u3002`;
        if (medicalRestriction && state !== "medical") {
          action = `\u5148\u628A${n.title}\u7684\u8FD9\u4E9B\u6765\u6E90\u4E0E\u73B0\u6709\u533B\u5631\u6838\u5BF9\uFF0C\u4E0D\u81EA\u884C\u589E\u52A0\u3001\u51CF\u5C11\u6216\u66F4\u6362\u53D7\u9650\u5236\u7684\u98DF\u7269\u3002`;
        }
        if (["energy", "many_foods"].includes(context.restriction) && state === "sources") {
          state = "review";
          reason += "\u4F60\u4E5F\u63D0\u5230\u957F\u671F\u51CF\u5C11\u98DF\u91CF\u6216\u6392\u9664\u591A\u7C7B\u98DF\u7269\uFF0C\u6709\u6765\u6E90\u4ECD\u9700\u8981\u8FDB\u4E00\u6B65\u6838\u5BF9\u5B9E\u9645\u603B\u91CF\u3002";
          if (!medicalRestriction) action = "\u5148\u8BB0\u5F55\u51E0\u4E2A\u6709\u4EE3\u8868\u6027\u7684\u5B8C\u6574\u996E\u98DF\u65E5\uFF0C\u6838\u5BF9\u5168\u5929\u4EFD\u91CF\uFF1B\u5FC5\u8981\u65F6\u8BF7\u8425\u517B\u5E08\u8BC4\u4F30\u6574\u4F53\u6444\u5165\u3002";
        }
        if (answers.audience === "minor_under_18" && state !== "medical") {
          if (state === "attention") state = "review";
          reason += "\u513F\u7AE5\u8FD8\u9700\u8981\u6309\u5177\u4F53\u5E74\u9F84\u3001\u751F\u957F\u60C5\u51B5\u53CA\u5976 / \u8F85\u98DF\u7B49\u6765\u6E90\u5355\u72EC\u8BC4\u4F30\u3002";
          action = "\u8BF7\u5BB6\u957F\u6309\u5B9E\u9645\u5E74\u9F84\u8BB0\u5F55\u8FDB\u98DF\u4E0E\u5976 / \u8F85\u98DF\u60C5\u51B5\uFF0C\u518D\u4E0E\u513F\u79D1\u6216\u8425\u517B\u4E13\u4E1A\u4EBA\u5458\u6838\u5BF9\uFF1B\u4E0D\u5957\u7528\u6210\u4EBA\u4EFD\u91CF\u6216\u6210\u4EBA\u8865\u5242\u3002";
        }
        return {
          ...n,
          state,
          status: labels[state],
          priority,
          reason,
          action,
          caution,
          evidence: evidence.map((item) => ({ ...item })),
          source: { id: `intake_${n.id}`, title: `NIH ODS \xB7 ${n.title}`, url: sourceUrl(n.slug) },
          limitations: broadOnly.has(n.id) ? "\u8BE5\u9879\u53EA\u505A\u7C97\u7565\u98DF\u7269\u6765\u6E90\u6838\u5BF9\uFF0C\u4E0D\u80FD\u9760\u672C\u95EE\u5377\u5224\u65AD\u7F3A\u4E4F\u6216\u8865\u5145\u9700\u8981\u3002" : "\u98DF\u7269\u9891\u7387\u548C\u7C97\u7565\u4EFD\u91CF\u53EA\u80FD\u63D0\u793A\u9700\u8981\u8FDB\u4E00\u6B65\u5173\u6CE8\u7684\u6765\u6E90\uFF1B\u6CA1\u6709\u8BA1\u7B97\u5B9E\u9645\u5438\u6536\u91CF\uFF0C\u4E5F\u4E0D\u80FD\u8BCA\u65AD\u4F53\u5185\u7F3A\u4E4F\u3002"
        };
      });
      return {
        version: "intake-source-review-v1",
        nutrients,
        priorities: nutrients.filter((item) => ["attention", "medical"].includes(item.state)).sort((a, b) => b.priority - a.priority),
        count: nutrients.length,
        unknownCount: nutrients.filter((item) => ["unknown", "review"].includes(item.state)).length,
        // Explicitly not a deficiency probability, percentage score or personal dose.
        isDiagnostic: false
      };
    }
    module.exports = { assessIntake, NUTRIENTS: NUTRIENTS2, sourceUrl };
  }
});

// resources/bubu-source/engine/matcher.js
var require_matcher = __commonJS({
  "resources/bubu-source/engine/matcher.js"(exports, module) {
    "use strict";
    var {
      MODES,
      QUESTIONS: QUESTIONS2,
      QUESTION_IDS,
      OPTION_IDS,
      FOOD_ROWS,
      getModeDefinition
    } = require_questions();
    var { assessIntake } = require_intake_screening();
    var URGENT_SAFETY_IDS = /* @__PURE__ */ new Set([
      "urgent_chest_breathing",
      "urgent_neurologic",
      "urgent_severe_allergy",
      "urgent_vision",
      "urgent_mental_safety",
      "urgent_overdose"
    ]);
    var PROFESSIONAL_SAFETY_IDS = /* @__PURE__ */ new Set([
      "pregnant_or_lactating",
      "medication",
      "chronic_or_labs",
      "malabsorption_or_bariatric",
      "surgery_or_reaction",
      "severe_mood_impairment",
      "medical_food_restriction_quick"
    ]);
    var TARGET_FLAG_MAP = Object.freeze({
      flag_eye: Object.freeze(["eyes"]),
      flag_hair_skin: Object.freeze(["hair", "skin"]),
      flag_gut: Object.freeze(["gut"]),
      flag_joint: Object.freeze(["joint", "bone"]),
      flag_cognition: Object.freeze(["brain"]),
      flag_sleep_function: Object.freeze(["sleep", "stress", "fatigue", "brain"]),
      flag_child_growth: Object.freeze(["life_stage"]),
      flag_persistent_function_quick: Object.freeze(["sleep", "stress", "fatigue", "brain", "gut", "skin", "hair", "eyes", "joint"])
    });
    var LOW_FREQUENCIES = /* @__PURE__ */ new Set(["zero", "one_two"]);
    var TRAINING_FREQUENCIES = /* @__PURE__ */ new Set(["one_two", "three_four", "five_plus"]);
    var GOAL_LABELS = Object.freeze((QUESTIONS2[QUESTION_IDS.GOALS].options || []).reduce((result, item) => {
      result[item.id] = item.label;
      return result;
    }, {}));
    function normalizeMultiAnswer2(value, noneId = OPTION_IDS.NONE) {
      let items = [];
      if (Array.isArray(value)) {
        items = value;
      } else if (typeof value === "string") {
        items = [value];
      } else if (value && typeof value === "object") {
        if (Array.isArray(value.selected)) {
          items = value.selected;
        } else if (Array.isArray(value.values)) {
          items = value.values;
        } else {
          items = Object.keys(value).filter((key) => value[key] === true);
        }
      }
      const unique = [];
      const seen = /* @__PURE__ */ new Set();
      items.forEach((item) => {
        if (typeof item !== "string") return;
        const id = item.trim();
        if (!id || seen.has(id)) return;
        seen.add(id);
        unique.push(id);
      });
      return noneId && unique.includes(noneId) ? [noneId] : unique;
    }
    function resolveQuestion(questionOrId) {
      if (questionOrId && typeof questionOrId === "object") return questionOrId;
      return QUESTIONS2[questionOrId] || null;
    }
    function validateStep2(questionOrId, answer, answers = {}) {
      const question = resolveQuestion(questionOrId);
      if (!question) return { valid: false, message: "\u627E\u4E0D\u5230\u8FD9\u4E00\u6B65\uFF0C\u8BF7\u8FD4\u56DE\u540E\u91CD\u8BD5\u3002" };
      if (question.type === "single") {
        const validIds = new Set((question.options || []).map((item) => item.id));
        const valid = typeof answer === "string" && validIds.has(answer);
        return { valid, message: valid ? "" : "\u8BF7\u9009\u62E9\u4E00\u4E2A\u6700\u7B26\u5408\u7684\u9009\u9879\u3002" };
      }
      if (question.type === "multi") {
        const selected = normalizeMultiAnswer2(answer, question.noneOptionId);
        const validIds = new Set((question.options || []).map((item) => item.id));
        const valid = selected.length > 0 && selected.every((id) => validIds.has(id));
        return { valid, message: valid ? "" : "\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u9879\u3002" };
      }
      if (question.type === "matrix") {
        const matrix = answer && typeof answer === "object" ? answer : {};
        const missingRows = (question.rows || []).filter((row) => !(row.choices || question.choices || []).some((item) => item.id === matrix[row.id]));
        const valid = missingRows.length === 0;
        return {
          valid,
          message: valid ? "" : `\u8FD8\u6709 ${missingRows.length} \u9879\u6CA1\u6709\u9009\u62E9\uFF1B\u4E0D\u786E\u5B9A\u53EF\u9009\u201C\u8BF4\u4E0D\u6E05\u201D\u3002`,
          missingRows: missingRows.map((row) => row.id)
        };
      }
      if (question.type === "fields") {
        const value = answer && typeof answer === "object" ? answer : {};
        const invalid = (question.fields || []).find((field) => {
          const allowed = new Set(field.options.map((item) => item.id));
          const selected = field.type === "multi" ? normalizeMultiAnswer2(value[field.id], null) : [value[field.id]];
          const exclusive = field.exclusiveIds || [];
          return !selected.length || selected.some((id) => !allowed.has(id)) || selected.length > 1 && selected.some((id) => exclusive.includes(id));
        });
        return { valid: !invalid, message: invalid ? `\u8BF7\u5B8C\u6210\u201C${invalid.title}\u201D\uFF1B\u4E0D\u786E\u5B9A\u53EF\u9009\u62E9\u76F8\u5E94\u9009\u9879\u3002` : "" };
      }
      if (question.type === "profile") {
        const value = answer && typeof answer === "object" ? answer : {};
        const sexField = (question.fields || []).find((field) => field.id === "sex") || {};
        const validSexIds = new Set((sexField.options || []).map((item) => item.id));
        if (!validSexIds.has(value.sex)) {
          return { valid: false, message: "\u8BF7\u9009\u62E9\u751F\u7406\u6027\u522B\uFF0C\u6216\u9009\u62E9\u201C\u4E0D\u60F3\u8BF4\u660E\u201D\u3002" };
        }
        const invalidMetric = (question.fields || []).find((field) => {
          if (field.type !== "number") return false;
          const rawValue = value[field.id];
          if (rawValue === "" || rawValue === void 0 || rawValue === null) return false;
          const numericValue = Number(rawValue);
          return !Number.isFinite(numericValue) || numericValue < field.min || numericValue > field.max;
        });
        if (invalidMetric) {
          return {
            valid: false,
            message: `${invalidMetric.title}\u8BF7\u586B\u5199\u5408\u7406\u6570\u503C\uFF0C\u6216\u7559\u7A7A\u8DF3\u8FC7\u3002`
          };
        }
        if (value.age !== "" && value.age !== void 0 && value.age !== null) {
          const age = Number(value.age);
          const audience = answers.audience;
          if (!Number.isInteger(age) || audience === OPTION_IDS.ADULT && (age < 18 || age >= 65) || audience === OPTION_IDS.MINOR && age >= 18 || audience === OPTION_IDS.SENIOR && age < 65) {
            return { valid: false, message: "\u5E74\u9F84\u4E0E\u7B2C\u4E00\u6B65\u9009\u62E9\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u68C0\u67E5\u5E74\u9F84\u6216\u8FD4\u56DE\u4FEE\u6539\u3002" };
          }
        }
        return { valid: true, message: "" };
      }
      if (question.type === "training") {
        const value = answer && typeof answer === "object" ? answer : {};
        const frequency = value.frequency;
        if (!["zero", "one_two", "three_four", "five_plus"].includes(frequency)) {
          return { valid: false, message: "\u8BF7\u9009\u62E9\u6BCF\u5468\u8BAD\u7EC3\u9891\u7387\u3002" };
        }
        if (frequency !== "zero" && normalizeMultiAnswer2(value.types, null).length === 0) {
          return { valid: false, message: "\u8BF7\u9009\u62E9\u81F3\u5C11\u4E00\u79CD\u8BAD\u7EC3\u7C7B\u578B\u3002" };
        }
        if (!["not_applicable", "under_45", "45_to_75", "over_75"].includes(value.duration)) {
          return { valid: false, message: "\u8BF7\u9009\u62E9\u5355\u6B21\u8BAD\u7EC3\u901A\u5E38\u591A\u4E45\u3002" };
        }
        if (!["not_applicable", "adequate", "sometimes_hard", "usually_hard", "unknown"].includes(value.protein_access || value.proteinAccess)) {
          return { valid: false, message: "\u8BF7\u9009\u62E9\u6B63\u9910\u86CB\u767D\u7684\u83B7\u53D6\u60C5\u51B5\u3002" };
        }
        return { valid: true, message: "" };
      }
      return { valid: !question.required || Boolean(answer), message: answer ? "" : "\u8BF7\u5B8C\u6210\u8FD9\u4E00\u6B65\u3002" };
    }
    function getSafetyDisposition2(answers = {}) {
      const audience = answers[QUESTION_IDS.AUDIENCE] || answers.audience;
      const rawSelected = normalizeMultiAnswer2(answers[QUESTION_IDS.SAFETY] || answers.safety, null);
      const selected = rawSelected.length > 1 ? rawSelected.filter((id) => id !== OPTION_IDS.NONE) : rawSelected;
      const urgentReasons = selected.filter((id) => URGENT_SAFETY_IDS.has(id));
      const professionalReasons = selected.filter((id) => PROFESSIONAL_SAFETY_IDS.has(id));
      const dietPattern = normalizeMultiAnswer2(answers[QUESTION_IDS.DIET_PATTERN] || answers.diet_pattern);
      if (dietPattern.includes("medical_food_restriction")) professionalReasons.push("medical_food_restriction");
      const labs = normalizeMultiAnswer2((answers.nutrition_context || {}).labs, null);
      if (labs.some((id) => ["d_low", "iron_low", "b12_low", "potassium_abnormal", "calcium_abnormal"].includes(id))) {
        professionalReasons.push("known_nutrient_labs");
      }
      const blockedTargets = [];
      selected.forEach((id) => {
        ;
        (TARGET_FLAG_MAP[id] || []).forEach((target) => {
          if (!blockedTargets.includes(target)) blockedTargets.push(target);
        });
      });
      if (urgentReasons.length > 0) {
        return {
          status: "stop",
          title: "\u8BF7\u5148\u5904\u7406\u5F53\u524D\u7684\u7D27\u6025\u60C5\u51B5",
          message: "\u672C\u95EE\u5377\u5DF2\u505C\u6B62\uFF0C\u4E0D\u4F1A\u663E\u793A\u4EFB\u4F55\u8865\u5242\u5361\u3002\u8BF7\u8054\u7CFB\u5F53\u5730\u6025\u6551\u3001\u6025\u8BCA\u6216\u4E2D\u6BD2\u54A8\u8BE2\uFF1B\u4E0D\u8981\u7B49\u5F85\u95EE\u5377\u7ED3\u679C\u3002",
          reasons: urgentReasons,
          blockedTargets,
          educationOnly: true
        };
      }
      if (audience === OPTION_IDS.SENIOR || audience === OPTION_IDS.MINOR) {
        professionalReasons.unshift(audience);
      }
      if (professionalReasons.length > 0) {
        return {
          status: "professional",
          title: "\u8FD9\u6B21\u9700\u8981\u4E13\u4E1A\u786E\u8BA4",
          message: "\u5F53\u524D\u7248\u672C\u4E0D\u4F1A\u5957\u7528\u666E\u901A\u6210\u4EBA\u8865\u5242\u8DEF\u5F84\uFF0C\u53EA\u63D0\u4F9B\u4E00\u822C\u98DF\u7269\u6559\u80B2\u3002\u8BF7\u4E0E\u533B\u751F\u3001\u836F\u5E08\u6216\u6CE8\u518C\u8425\u517B\u5E08\u786E\u8BA4\u3002",
          reasons: Array.from(new Set(professionalReasons)),
          blockedTargets,
          educationOnly: true
        };
      }
      return {
        status: "continue",
        title: blockedTargets.length ? "\u53EF\u7EE7\u7EED\uFF0C\u4F46\u90E8\u5206\u76EE\u6807\u4F1A\u6682\u505C" : "\u53EF\u4EE5\u7EE7\u7EED\u4E00\u822C\u8425\u517B\u5339\u914D",
        message: blockedTargets.length ? "\u5E26\u6709\u7EA2\u65D7\u4FE1\u53F7\u7684\u76F8\u5173\u76EE\u6807\u4E0D\u4F1A\u751F\u6210\u8865\u5242\u5185\u5BB9\uFF1B\u5176\u4ED6\u76EE\u6807\u4ECD\u53EA\u505A\u4E00\u822C\u8425\u517B\u6559\u80B2\u3002" : "\u7ED3\u679C\u53EA\u505A\u98DF\u7269\u6765\u6E90\u4E0E\u8425\u517B\u7C7B\u522B\u6559\u80B2\uFF0C\u4E0D\u8BCA\u65AD\u7F3A\u4E4F\uFF0C\u4E5F\u4E0D\u63D0\u4F9B\u4E2A\u4EBA\u5242\u91CF\u3002",
        reasons: [],
        blockedTargets,
        educationOnly: false
      };
    }
    function shouldShowSleepDetail(answers = {}) {
      const goals = normalizeMultiAnswer2(answers[QUESTION_IDS.GOALS] || answers.goals);
      return ["sleep", "stress", "fatigue", "brain"].some((id) => goals.includes(id));
    }
    function buildQuestionPlan2(mode = "quick", answers = {}) {
      const normalizedMode = MODES[mode] ? mode : "quick";
      let baseIds = normalizedMode === "detailed" ? [
        QUESTION_IDS.AUDIENCE,
        QUESTION_IDS.SAFETY,
        QUESTION_IDS.PROFILE,
        QUESTION_IDS.SCENES,
        QUESTION_IDS.DAILY_LOAD,
        QUESTION_IDS.GOALS,
        QUESTION_IDS.IMPACT,
        QUESTION_IDS.DIET_PATTERN,
        QUESTION_IDS.FOOD_FREQUENCY,
        QUESTION_IDS.DAILY_PORTIONS,
        QUESTION_IDS.FOOD_SOURCES,
        QUESTION_IDS.NUTRITION_CONTEXT,
        QUESTION_IDS.EXISTING_SOURCES,
        QUESTION_IDS.TRAINING_DETAIL
      ] : [
        QUESTION_IDS.AUDIENCE,
        QUESTION_IDS.SAFETY,
        QUESTION_IDS.SCENES,
        QUESTION_IDS.GOALS,
        QUESTION_IDS.FOOD_QUICK
      ];
      if (normalizedMode === "detailed" && shouldShowSleepDetail(answers)) {
        const impactIndex = baseIds.indexOf(QUESTION_IDS.IMPACT);
        baseIds = baseIds.slice();
        baseIds.splice(impactIndex, 0, QUESTION_IDS.SLEEP_DETAIL);
      }
      const disposition = getSafetyDisposition2(answers);
      if (normalizedMode === "detailed" && disposition.status === "professional") {
        baseIds.splice(baseIds.indexOf(QUESTION_IDS.TRAINING_DETAIL), 0, QUESTION_IDS.HEALTH_DETAIL);
      }
      let visibleIds = baseIds;
      if (disposition.status === "stop") {
        visibleIds = baseIds.filter((id) => id === QUESTION_IDS.AUDIENCE || id === QUESTION_IDS.SAFETY);
      }
      return visibleIds.map((id) => QUESTIONS2[id]);
    }
    function isLowFrequency(foodFrequency, rowId) {
      return LOW_FREQUENCIES.has(foodFrequency[rowId]);
    }
    function createFoodAssessment(mode, answers, diet) {
      const quick = new Set(normalizeMultiAnswer2(answers[QUESTION_IDS.FOOD_QUICK] || answers.food_quick));
      const matrix = answers[QUESTION_IDS.FOOD_FREQUENCY] && typeof answers[QUESTION_IDS.FOOD_FREQUENCY] === "object" ? answers[QUESTION_IDS.FOOD_FREQUENCY] : {};
      const detailed = mode === "detailed";
      function low(rowId, quickId) {
        return detailed ? isLowFrequency(matrix, rowId) : quick.has(quickId);
      }
      const vegan = diet.has(OPTION_IDS.VEGAN) || quick.has("no_reliable_b12");
      return {
        dairy: low("dairy_calcium", "low_dairy_calcium") || diet.has("low_dairy"),
        calciumSoy: low("calcium_soy", "low_calcium_soy"),
        eggs: vegan || low("eggs", "low_eggs"),
        meatPoultry: vegan || low("meat_poultry", "low_meat_poultry"),
        fattyFish: vegan || low("fatty_fish", "low_fatty_fish") || diet.has("low_fish"),
        seafood: vegan || low("seafood", "low_seafood") || diet.has("low_fish"),
        darkGreens: low("dark_greens", "low_dark_greens"),
        orangeProduce: low("orange_produce", "low_orange_produce"),
        fruitVeg: low("fruit_veg", "low_fruit_veg"),
        wholeGrains: low("whole_grains", "low_whole_grains"),
        nutsSeeds: low("nuts_seeds", "low_nuts_seeds"),
        vegan,
        noReliableB12: vegan && !diet.has(OPTION_IDS.RELIABLE_B12) && (detailed || quick.has("no_reliable_b12")),
        iodineUncertain: diet.has("non_iodized_or_unknown_salt") || quick.has("non_iodized_or_unknown_salt"),
        prolongedSweat: quick.has("sweat_over_2h_limited_meals")
      };
    }
    function buildSceneProfile(answers = {}) {
      const scenes = normalizeMultiAnswer2(answers[QUESTION_IDS.SCENES] || answers.scenes);
      const loads = normalizeMultiAnswer2(answers[QUESTION_IDS.DAILY_LOAD] || answers.daily_load);
      const sceneLabels = (QUESTIONS2[QUESTION_IDS.SCENES].options || []).reduce((result, item) => {
        result[item.id] = item.label;
        return result;
      }, {});
      const loadLabels = (QUESTIONS2[QUESTION_IDS.DAILY_LOAD].options || []).reduce((result, item) => {
        result[item.id] = item.label;
        return result;
      }, {});
      const profile = [];
      scenes.filter((id) => id !== OPTION_IDS.NONE).forEach((id) => {
        profile.push({ id: `scene_${id}`, title: sceneLabels[id] || id, type: "scene" });
      });
      loads.filter((id) => id !== OPTION_IDS.NONE).forEach((id) => {
        profile.push({ id: `load_${id}`, title: loadLabels[id] || id, type: "load" });
      });
      const training = answers[QUESTION_IDS.TRAINING_DETAIL] || answers.training_detail;
      if (training && TRAINING_FREQUENCIES.has(training.frequency)) {
        const frequencyLabels = { one_two: "\u6BCF\u5468\u8BAD\u7EC3 1\u20132 \u6B21", three_four: "\u6BCF\u5468\u8BAD\u7EC3 3\u20134 \u6B21", five_plus: "\u6BCF\u5468\u8BAD\u7EC3 5 \u6B21\u53CA\u4EE5\u4E0A" };
        profile.push({ id: "training_frequency", title: frequencyLabels[training.frequency], type: "training" });
      }
      const sleepDetails = normalizeMultiAnswer2(answers[QUESTION_IDS.SLEEP_DETAIL] || answers.sleep_detail);
      const sleepLabels = {
        sleep_hard_to_start: "\u7761\u7720\uFF1A\u5165\u7761\u8017\u65F6\u957F",
        sleep_waking: "\u7761\u7720\uFF1A\u591C\u91CC\u5BB9\u6613\u9192",
        sleep_early_waking: "\u7761\u7720\uFF1A\u5E38\u63D0\u524D\u9192",
        sleep_short_opportunity: "\u7761\u7720\uFF1A\u65F6\u95F4\u5E38\u88AB\u6324\u5360",
        sleep_nonrestorative: "\u7761\u7720\uFF1A\u9192\u6765\u4ECD\u4E0D\u89E3\u4E4F",
        sleep_schedule_shift: "\u7761\u7720\uFF1A\u4F5C\u606F\u7ECF\u5E38\u53D8\u5316"
      };
      sleepDetails.filter((id) => sleepLabels[id]).slice(0, 2).forEach((id) => {
        profile.push({ id: `sleep_${id}`, title: sleepLabels[id], type: "sleep" });
      });
      return profile;
    }
    function card(id, title, data2 = {}) {
      return Object.assign({
        id,
        title,
        kind: "nutrition-category",
        priority: 3,
        evidence: "\u6765\u6E90\u8BC4\u4F30",
        why: "",
        foodFirst: "",
        boundary: "\u672C\u5361\u53EA\u505A\u4E00\u822C\u8425\u517B\u6559\u80B2\uFF0C\u4E0D\u4EE3\u8868\u7F3A\u4E4F\u8BCA\u65AD\u3001\u4E2A\u4EBA\u5242\u91CF\u6216\u5546\u54C1\u63A8\u8350\u3002",
        matchedGoals: []
      }, data2);
    }
    function addUnique(collection, value) {
      const existing = collection.find((item) => item.id === value.id);
      if (!existing) {
        collection.push(value);
        return value;
      }
      existing.matchedGoals = Array.from(/* @__PURE__ */ new Set([...existing.matchedGoals || [], ...value.matchedGoals || []]));
      return existing;
    }
    function buildQuestionnaireResult(mode = "quick", answers = {}) {
      const normalizedMode = MODES[mode] ? mode : "quick";
      const modeDefinition = getModeDefinition(normalizedMode);
      const safety = Object.assign({}, getSafetyDisposition2(answers));
      const impact = answers[QUESTION_IDS.IMPACT] || answers.impact || "";
      const persistentImpact = impact === "persistent_impairing";
      if (safety.status === "continue" && persistentImpact) {
        safety.title = "\u8FD9\u4E9B\u56F0\u6270\u5DF2\u660E\u663E\u5F71\u54CD\u751F\u6D3B\uFF0C\u5EFA\u8BAE\u5148\u8FDB\u4E00\u6B65\u8BC4\u4F30";
        safety.message = "\u75C7\u72B6\u578B\u5185\u5BB9\u53EA\u4FDD\u7559\u4E3A\u77E5\u8BC6\u8BF4\u660E\uFF0C\u4E0D\u4F5C\u4E3A\u8865\u5242\u65B9\u5411\u3002\u8BF7\u4F18\u5148\u548C\u533B\u751F\u6216\u5408\u9002\u7684\u4E13\u4E1A\u4EBA\u5458\u8BC4\u4F30\u6301\u7EED\u539F\u56E0\u3002";
        safety.needsFurtherAssessment = true;
      }
      const selectedGoals = normalizeMultiAnswer2(answers[QUESTION_IDS.GOALS] || answers.goals).filter((id) => id !== OPTION_IDS.NONE);
      const comprehensiveMode = selectedGoals.includes(OPTION_IDS.COMPREHENSIVE_GOAL) || selectedGoals.length >= 4;
      const baseResult = {
        mode: normalizedMode,
        modeDefinition,
        safety,
        sceneProfile: buildSceneProfile(answers),
        foodFoundations: [],
        topActions: [],
        allMatches: [],
        researchCards: [],
        notRecommended: [],
        targetCoverage: [],
        comprehensiveMode,
        disclaimer: "\u95EE\u5377\u53EA\u505A\u4E00\u822C\u8425\u517B\u4E0E\u98DF\u7269\u6765\u6E90\u6559\u80B2\uFF0C\u4E0D\u8BCA\u65AD\u3001\u4E0D\u6CBB\u7597\uFF0C\u4E5F\u4E0D\u63D0\u4F9B\u4E2A\u4EBA\u5242\u91CF\u6216\u5177\u4F53\u5546\u54C1\u3002"
      };
      if (safety.status === "stop") {
        baseResult.sceneProfile = [];
        return baseResult;
      }
      if (normalizedMode === "detailed") baseResult.intakeAssessment = assessIntake(answers, safety);
      if (safety.status === "professional") {
        baseResult.foodFoundations.push({
          id: "general_food_education",
          title: "\u5148\u4FDD\u6301\u89C4\u5F8B\u3001\u5747\u8861\u548C\u591A\u6837\u7684\u996E\u98DF",
          detail: "\u5F53\u524D\u8EAB\u4EFD\u6216\u5065\u5EB7\u60C5\u51B5\u9700\u8981\u4E13\u95E8\u8BC4\u4F30\uFF1B\u672C\u7ED3\u679C\u4E0D\u4F1A\u751F\u6210\u666E\u901A\u6210\u4EBA\u8865\u5242\u5019\u9009\u3002",
          kind: "food-education"
        });
        return baseResult;
      }
      const blockedTargets = new Set(safety.blockedTargets || []);
      const activeGoals = new Set(selectedGoals.filter((id) => !blockedTargets.has(id)));
      const scenes = new Set(normalizeMultiAnswer2(answers[QUESTION_IDS.SCENES] || answers.scenes));
      const loads = new Set(normalizeMultiAnswer2(answers[QUESTION_IDS.DAILY_LOAD] || answers.daily_load));
      const diet = new Set(normalizeMultiAnswer2(answers[QUESTION_IDS.DIET_PATTERN] || answers.diet_pattern));
      const food = createFoodAssessment(normalizedMode, answers, diet);
      const training = answers[QUESTION_IDS.TRAINING_DETAIL] || answers.training_detail || {};
      const trainingTypes = new Set(normalizeMultiAnswer2(training.types, null));
      const explicitStrength = normalizedMode === "quick" ? scenes.has(OPTION_IDS.STRENGTH_SCENE) : TRAINING_FREQUENCIES.has(training.frequency) && (trainingTypes.has("strength") || trainingTypes.has("hiit"));
      const explicitEndurance = normalizedMode === "quick" ? scenes.has(OPTION_IDS.ENDURANCE_SCENE) : TRAINING_FREQUENCIES.has(training.frequency) && (trainingTypes.has("endurance_over_60") || trainingTypes.has("competition_or_twice_daily"));
      const prolongedSweat = food.prolongedSweat || loads.has("sweat_over_2h_limited_meals");
      const magnesiumFoodSourcesLow = [food.calciumSoy, food.wholeGrains, food.nutsSeeds, food.darkGreens].filter(Boolean).length >= 3;
      const vitaminAAnimalSourcesLow = diet.has(OPTION_IDS.VEGAN) || food.dairy && food.eggs && food.meatPoultry;
      function foundation(id, title, detail, relatedGoals = []) {
        addUnique(baseResult.foodFoundations, { id, title, detail, kind: "food-foundation", relatedGoals });
      }
      function match(id, title, data2) {
        return addUnique(baseResult.allMatches, card(id, title, data2));
      }
      function research(id, title, data2) {
        return addUnique(baseResult.researchCards, card(id, title, Object.assign({ kind: "research", priority: 4 }, data2)));
      }
      function decline(id, title, reason, matchedGoals = []) {
        return addUnique(baseResult.notRecommended, {
          id,
          title,
          reason,
          status: "not_automatic",
          matchedGoals
        });
      }
      if (food.fattyFish) {
        foundation("fatty_fish_foundation", "\u628A\u5BCC\u8102\u9C7C\u5B89\u6392\u8FDB\u6BCF\u5468\u996E\u98DF", "\u5148\u770B\u80FD\u5426\u7528\u5BCC\u8102\u9C7C\u8986\u76D6\uFF1B\u957F\u671F\u4E0D\u5403\u9C7C\u65F6\uFF0C\u518D\u4E86\u89E3\u6807\u660E EPA+DHA \u542B\u91CF\u7684\u85FB\u6CB9\u6216\u9C7C\u6CB9\u6765\u6E90\u3002", ["diet_coverage", "cardiometabolic", "brain"]);
        match("epa_dha_sources", "\u4F18\u5148\u628A\u5BCC\u8102\u9C7C\u5B89\u6392\u8FDB\u6BCF\u5468\u996E\u98DF", {
          priority: 2,
          evidence: "\u98DF\u7269\u6765\u6E90\u6761\u4EF6\u578B",
          why: "\u5BCC\u8102\u9C7C\u6765\u6E90\u5F88\u5C11\uFF0C\u6216\u996E\u98DF\u660E\u786E\u6392\u9664\u9C7C\u7C7B\u3002",
          foodFirst: "\u4F18\u5148\u8003\u8651\u4E09\u6587\u9C7C\u3001\u6C99\u4E01\u9C7C\u3001\u9CAD\u9C7C\u7B49\u5BCC\u8102\u9C7C\uFF1B\u7EAF\u7D20\u8005\u53EF\u4E86\u89E3\u85FB\u6CB9\u6765\u6E90\u3002",
          boundary: "\u4E0D\u628A\u9C7C\u6CB9\u603B\u91CD\u5F53\u4F5C EPA+DHA\uFF0C\u4E5F\u4E0D\u627F\u8BFA\u62A4\u5FC3\u6216\u62A4\u8111\uFF1B\u7528\u836F\u6216\u75BE\u75C5\u7BA1\u7406\u9700\u4E13\u4E1A\u786E\u8BA4\u3002",
          matchedGoals: ["diet_coverage"].filter((id) => activeGoals.has(id))
        });
      }
      if (food.dairy && food.calciumSoy) {
        foundation("calcium_food_foundation", "\u628A\u7A33\u5B9A\u7684\u9499\u6765\u6E90\u52A0\u8FDB\u6BCF\u5929\u996E\u98DF", "\u5976/\u5F3A\u5316\u9499\u996E\u54C1\u548C\u8C46\u8150/\u5927\u8C46\u5236\u54C1\u90FD\u8F83\u5C11\uFF0C\u5148\u89C4\u5212\u53EF\u6301\u7EED\u7684\u9499\u98DF\u7269\u6765\u6E90\u3002", ["bone", "diet_coverage"]);
        match("calcium_sources", "\u628A\u7A33\u5B9A\u7684\u9499\u6765\u6E90\u52A0\u8FDB\u6BCF\u5929\u996E\u98DF", {
          priority: 2,
          evidence: "\u98DF\u7269\u6765\u6E90\u6761\u4EF6\u578B",
          why: "\u4E24\u7C7B\u4E3B\u8981\u9499\u6765\u6E90\u540C\u65F6\u504F\u5C11\u3002",
          foodFirst: "\u5976\u3001\u9178\u5976\u3001\u660E\u786E\u5F3A\u5316\u9499\u7684\u690D\u7269\u996E\u54C1\u548C\u5408\u9002\u7684\u8C46\u5236\u54C1\u4F18\u5148\u3002",
          boundary: "\u8FD9\u4E0D\u4EE3\u8868\u5DF2\u7F3A\u9499\uFF1B\u662F\u5426\u9700\u8981\u8865\u5145\u91CF\u8FD8\u53D6\u51B3\u4E8E\u603B\u996E\u98DF\u3001\u5E74\u9F84\u548C\u4E13\u4E1A\u8D44\u6599\u3002",
          matchedGoals: ["bone", "diet_coverage"].filter((id) => activeGoals.has(id))
        });
      }
      if (food.vegan) {
        foundation("vegan_iron_zinc_foods", "\u7EAF\u7D20\u996E\u98DF\u5206\u522B\u68C0\u67E5\u94C1\u4E0E\u950C\u98DF\u7269\u6765\u6E90", "\u8C46\u7C7B\u3001\u8C46\u5236\u54C1\u3001\u5168\u8C37\u548C\u575A\u679C\u79CD\u5B50\u9700\u8981\u5355\u72EC\u770B\uFF1B\u75B2\u52B3\u6216\u8131\u53D1\u4E0D\u80FD\u4EE3\u66FF\u5316\u9A8C\u3002", ["diet_coverage"]);
        decline("vegan_iron_zinc_supplements", "\u7EAF\u7D20\u996E\u98DF\uFF1A\u5148\u9010\u9879\u6838\u5BF9\u94C1\u548C\u950C\u7684\u6765\u6E90", "\u7EAF\u7D20\u8EAB\u4EFD\u53EA\u89E6\u53D1\u6765\u6E90\u8BC4\u4F30\uFF1B\u94C1\u5242\u9700\u8981\u7ED3\u5408\u98CE\u9669\u3001\u75C7\u72B6\u548C\u4E13\u4E1A\u68C0\u67E5\uFF0C\u950C\u4E5F\u8981\u8003\u8651\u603B\u91CF\u4E0E\u94DC\u5E73\u8861\u3002", ["diet_coverage", "fatigue", "hair"].filter((id) => activeGoals.has(id)));
        if (food.noReliableB12) {
          foundation("b12_reliable_foundation", "\u6838\u5BF9\u4F60\u7684\u53EF\u9760\u7EF4\u751F\u7D20 B12 \u6765\u6E90", "\u7EAF\u7D20\u996E\u98DF\u4E0D\u80FD\u4F9D\u8D56\u6D77\u85FB\u6216\u666E\u901A\u53D1\u9175\u98DF\u54C1\u4F5C\u4E3A\u53EF\u9760 B12 \u6765\u6E90\u3002", ["diet_coverage"]);
          match("b12_reliable_source", "\u6838\u5BF9\u4F60\u7684\u53EF\u9760\u7EF4\u751F\u7D20 B12 \u6765\u6E90", {
            priority: 1,
            evidence: "\u660E\u786E\u996E\u98DF\u6392\u9664",
            why: "\u7EAF\u7D20\u4E14\u6CA1\u6709\u6309\u6807\u7B7E\u89C4\u5F8B\u4F7F\u7528\u53EF\u9760\u7684 B12 \u5F3A\u5316\u98DF\u54C1\u6216\u8865\u5145\u6765\u6E90\u3002",
            foodFirst: "\u67E5\u770B\u5F3A\u5316\u98DF\u54C1\u6807\u7B7E\u662F\u5426\u660E\u786E\u6807\u6CE8 B12 \u542B\u91CF\u548C\u4F7F\u7528\u9891\u7387\u3002",
            boundary: "\u672C\u95EE\u5377\u4E0D\u8BA1\u7B97\u4E2A\u4EBA\u5242\u91CF\uFF1B\u5982\u5DF2\u6709\u795E\u7ECF\u75C7\u72B6\u3001\u8D2B\u8840\u6216\u5F02\u5E38\u5316\u9A8C\uFF0C\u5E94\u4E13\u4E1A\u8BC4\u4F30\u3002",
            matchedGoals: ["diet_coverage"].filter((id) => activeGoals.has(id))
          });
        }
        if (food.iodineUncertain) {
          foundation("iodine_food_foundation", "\u6838\u5BF9\u5BB6\u7528\u76D0\u4E0E\u7898\u6765\u6E90", "\u7EAF\u7D20\u4E14\u52A0\u7898\u76D0\u4F7F\u7528\u4E0D\u660E\u786E\u65F6\uFF0C\u5148\u6838\u5BF9\u76D0\u6807\u7B7E\u548C\u5B9E\u9645\u7528\u91CF\uFF0C\u4E0D\u628A\u6D77\u85FB\u5F53\u4F5C\u7A33\u5B9A\u5242\u91CF\u6765\u6E90\u3002", ["diet_coverage"]);
          match("iodine_source_review", "\u6838\u5BF9\u5BB6\u7528\u76D0\u4E0E\u7898\u6765\u6E90", {
            priority: 2,
            evidence: "\u6765\u6E90\u8BC4\u4F30",
            why: "\u7EAF\u7D20\u996E\u98DF\u53E0\u52A0\u52A0\u7898\u76D0\u6765\u6E90\u4E0D\u660E\u786E\u3002",
            foodFirst: "\u67E5\u770B\u5BB6\u7528\u76D0\u662F\u5426\u52A0\u7898\uFF1B\u6D77\u85FB\u7898\u542B\u91CF\u6CE2\u52A8\u5F88\u5927\u3002",
            boundary: "\u4E0D\u81EA\u52A8\u63A8\u8350\u7898\u7247\uFF1B\u7532\u72B6\u817A\u95EE\u9898\u3001\u5B55\u54FA\u6216\u7528\u836F\u65F6\u9700\u4E13\u4E1A\u786E\u8BA4\u3002",
            matchedGoals: ["diet_coverage"].filter((id) => activeGoals.has(id))
          });
        }
      }
      if (food.darkGreens && food.orangeProduce && vitaminAAnimalSourcesLow) {
        foundation("vitamin_a_food_foundation", "\u628A\u6DF1\u7EFF\u53F6\u83DC\u548C\u6A59\u9EC4\u8272\u852C\u679C\u52A0\u8FDB\u4E00\u5468", "\u6DF1\u7EFF\u53F6\u83DC\u3001\u6A59\u9EC4\u8272\u852C\u679C\u548C\u52A8\u7269\u6027\u6765\u6E90\u540C\u65F6\u8F83\u5C11\uFF0C\u5148\u589E\u52A0\u591A\u6837\u98DF\u7269\u6765\u6E90\u3002", ["diet_coverage", "skin", "eyes"]);
        match("vitamin_a_source_review", "\u5148\u8865\u9F50\u7EF4\u751F\u7D20 A \u76F8\u5173\u98DF\u7269\u6765\u6E90", {
          priority: 3,
          evidence: "\u98DF\u7269\u6765\u6E90\u8BC4\u4F30",
          why: "\u690D\u7269\u524D\u4F53\u548C\u52A8\u7269\u6027\u98DF\u7269\u6765\u6E90\u540C\u65F6\u504F\u5C11\u3002",
          foodFirst: "\u4F18\u5148\u589E\u52A0\u6DF1\u7EFF\u53F6\u83DC\u3001\u6A59\u9EC4\u8272\u852C\u679C\u53CA\u9002\u5408\u81EA\u8EAB\u996E\u98DF\u65B9\u5F0F\u7684\u98DF\u7269\u6765\u6E90\u3002",
          boundary: "\u4E0D\u56E0\u76AE\u80A4\u6216\u7528\u773C\u81EA\u52A8\u63A8\u8350\u7EF4 A \u8865\u5145\u5242\uFF1B\u5907\u5B55\u5B55\u671F\u3001\u7EF4 A \u9178\u7C7B\u836F\u7269\u53CA\u9C7C\u809D\u6CB9\u53E0\u52A0\u5C24\u5176\u9700\u8C28\u614E\u3002",
          matchedGoals: ["diet_coverage", "skin", "eyes"].filter((id) => activeGoals.has(id))
        });
      }
      if (explicitStrength) {
        foundation("training_protein_foundation", "\u8BA9\u8BAD\u7EC3\u65E5\u7684\u6B63\u9910\u86CB\u767D\u66F4\u7A33\u5B9A", "\u628A\u86CB\u767D\u5206\u5E03\u5230\u6B63\u9910\uFF1B\u7C89\u5242\u53EA\u662F\u98DF\u7269\u96BE\u4EE5\u8986\u76D6\u65F6\u7684\u4FBF\u5229\u5F62\u5F0F\u3002", ["strength"]);
        match("training_protein", "\u5148\u8BA9\u8BAD\u7EC3\u65E5\u7684\u6B63\u9910\u86CB\u767D\u66F4\u7A33\u5B9A", {
          priority: 1,
          evidence: "\u660E\u786E\u8BAD\u7EC3\u573A\u666F",
          why: "\u5DF2\u786E\u8BA4\u89C4\u5F8B\u529B\u91CF\u6216\u77ED\u65F6\u9AD8\u5F3A\u5EA6\u8BAD\u7EC3\u3002",
          foodFirst: "\u5148\u7528\u6B63\u9910\u4E2D\u7684\u86CB\u3001\u5976\u3001\u8089\u3001\u9C7C\u3001\u8C46\u7C7B\u548C\u8C46\u5236\u54C1\u89C4\u5212\u5168\u5929\u86CB\u767D\u3002",
          boundary: "\u4E0D\u4ECE\u201C\u75B2\u52B3\u201D\u63A8\u51FA\u86CB\u767D\u7C89\uFF0C\u4E5F\u4E0D\u5728\u7F3A\u5C11\u4F53\u91CD\u3001\u603B\u80FD\u91CF\u548C\u4EFD\u91CF\u65F6\u8BA1\u7B97\u514B\u6570\u3002",
          matchedGoals: ["strength"].filter((id) => activeGoals.has(id))
        });
        match("creatine_monohydrate", "\u53EF\u4EE5\u8FDB\u4E00\u6B65\u4E86\u89E3\u808C\u9178\u4E00\u6C34\u5408\u7269", {
          priority: 1,
          evidence: "\u8FD0\u52A8\u8BC1\u636E\u8F83\u5145\u5206",
          why: "\u89C4\u5F8B\u529B\u91CF\u3001\u589E\u808C\u6216\u77ED\u65F6\u9AD8\u5F3A\u5EA6\u8BAD\u7EC3\u6761\u4EF6\u660E\u786E\u3002",
          foodFirst: "\u5B83\u4E0D\u662F\u996E\u98DF\u5E95\u76D8\u7684\u66FF\u4EE3\u54C1\uFF0C\u5148\u786E\u4FDD\u8BAD\u7EC3\u3001\u80FD\u91CF\u548C\u86CB\u767D\u5B89\u6392\u3002",
          boundary: "\u8FD9\u91CC\u53EA\u663E\u793A\u8FD0\u52A8\u7C7B\u522B\uFF0C\u4E0D\u7ED9\u4E2A\u4EBA\u5242\u91CF\uFF1B\u4E0D\u4F1A\u56E0\u4E3A\u8111\u96FE\u5355\u72EC\u63A8\u8350\u808C\u9178\u3002",
          matchedGoals: ["strength"].filter((id) => activeGoals.has(id))
        });
      }
      if (explicitEndurance) {
        foundation("endurance_fueling_foundation", "\u5148\u5B8C\u5584\u957F\u65F6\u8BAD\u7EC3\u7684\u8FDB\u98DF\u4E0E\u8865\u6DB2", "\u8FD0\u52A8\u996E\u6599\u548C\u7535\u89E3\u8D28\u4E0D\u662F\u65E5\u5E38\u77ED\u7EC3\u7684\u9ED8\u8BA4\u9009\u62E9\u3002", ["endurance"]);
        match("endurance_fueling", "\u5148\u5B8C\u5584\u957F\u65F6\u8BAD\u7EC3\u7684\u8FDB\u98DF\u4E0E\u8865\u6DB2", {
          priority: 2,
          evidence: "\u660E\u786E\u8BAD\u7EC3\u573A\u666F",
          why: "\u5DF2\u786E\u8BA4\u957F\u65F6\u8010\u529B\u3001\u5907\u8D5B\u6216\u4E00\u5929\u591A\u7EC3\u3002",
          foodFirst: "\u5148\u89C4\u5212\u8BAD\u7EC3\u524D\u540E\u6B63\u9910\u3001\u78B3\u6C34\u548C\u6DB2\u4F53\u3002",
          boundary: "\u672C\u95EE\u5377\u672A\u6536\u96C6\u4F53\u91CD\u4E0E\u6C57\u7387\uFF0C\u4E0D\u8BA1\u7B97\u4E2A\u4F53\u5316\u8865\u6DB2\u6216\u78B3\u6C34\u91CF\u3002",
          matchedGoals: ["endurance"].filter((id) => activeGoals.has(id))
        });
      }
      if (prolongedSweat) {
        foundation("hydration_foundation", "\u957F\u65F6\u5927\u91CF\u51FA\u6C57\u65F6\uFF0C\u5148\u4FDD\u8BC1\u6C34\u548C\u6B63\u5E38\u8FDB\u9910", "\u53EA\u6709\u8FDE\u7EED\u660E\u663E\u51FA\u6C57\u6570\u5C0F\u65F6\u4E14\u6B63\u5E38\u8FDB\u9910\u53D7\u9650\u65F6\uFF0C\u624D\u6253\u5F00\u7535\u89E3\u8D28\u7C7B\u522B\u3002", ["endurance"]);
        match("hydration_electrolytes", "\u957F\u65F6\u51FA\u6C57\u65F6\u518D\u8003\u8651\u7535\u89E3\u8D28", {
          priority: 2,
          evidence: "\u573A\u666F\u6761\u4EF6\u578B",
          why: "\u660E\u786E\u5B58\u5728\u8FDE\u7EED\u51FA\u6C57\u8D85\u8FC7 2 \u5C0F\u65F6\u4E14\u4E0D\u4FBF\u6B63\u5E38\u8FDB\u9910\u7684\u6761\u4EF6\u3002",
          foodFirst: "\u666E\u901A\u77ED\u65F6\u6D3B\u52A8\u901A\u5E38\u5148\u7528\u6C34\u548C\u6B63\u5E38\u6B63\u9910\u6062\u590D\u3002",
          boundary: "\u4E0D\u9ED8\u8BA4\u63A8\u8350\u76D0\u7247\uFF1B\u75BE\u75C5\u3001\u7528\u836F\u6216\u6781\u7AEF\u73AF\u5883\u5E94\u7531\u4E13\u4E1A\u4EBA\u5458\u5236\u5B9A\u65B9\u6848\u3002",
          matchedGoals: ["endurance"].filter((id) => activeGoals.has(id))
        });
      }
      if (activeGoals.has("gut") && (food.fruitVeg || food.wholeGrains || food.calciumSoy)) {
        foundation("fiber_food_foundation", "\u628A\u7EA4\u7EF4\u98DF\u7269\u6162\u6162\u52A0\u56DE\u65E5\u5E38\u996E\u98DF", "\u9010\u6B65\u589E\u52A0\u852C\u679C\u3001\u5168\u8C37\u3001\u8C46\u7C7B\u5E76\u914D\u5408\u996E\u6C34\uFF0C\u6BD4\u6CDB\u63A8\u76CA\u751F\u83CC\u66F4\u9002\u5408\u4F5C\u4E3A\u7B2C\u4E00\u6B65\u3002", ["gut"]);
        match("fiber_food_sources", "\u5148\u628A\u7EA4\u7EF4\u98DF\u7269\u6162\u6162\u52A0\u56DE\u65E5\u5E38\u996E\u98DF", {
          priority: 2,
          evidence: "\u98DF\u7269\u6765\u6E90\u6761\u4EF6\u578B",
          why: "\u6392\u4FBF/\u6D88\u5316\u76EE\u6807\u53E0\u52A0\u591A\u7C7B\u7EA4\u7EF4\u98DF\u7269\u6765\u6E90\u504F\u5C11\u3002",
          foodFirst: "\u852C\u679C\u3001\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u575A\u679C\u79CD\u5B50\u4F18\u5148\uFF0C\u5E76\u5FAA\u5E8F\u589E\u52A0\u3002",
          boundary: "\u4FBF\u8840\u3001\u6D88\u7626\u3001\u6301\u7EED\u5455\u5410\u6216\u660E\u663E\u8179\u75DB\u5E94\u5148\u5C31\u533B\uFF1B\u672C\u5361\u4E0D\u6CDB\u63A8\u76CA\u751F\u83CC\u3002",
          matchedGoals: ["gut"]
        });
      }
      if ((activeGoals.has("sleep") || activeGoals.has("stress")) && magnesiumFoodSourcesLow) {
        research("magnesium_glycinate_sleep_stress", "\u5173\u4E8E\u7518\u6C28\u9178\u9541\uFF1A\u5148\u770B\u6E05\u5B83\u80FD\u505A\u4EC0\u4E48\u3001\u4E0D\u80FD\u505A\u4EC0\u4E48", {
          evidence: "\u6709\u9650\u8BC1\u636E\uFF0C\u4E0D\u81EA\u52A8\u63A8\u8350",
          why: "\u7761\u7720\u6216\u538B\u529B\u76EE\u6807\u53E0\u52A0\u591A\u7C7B\u9541\u98DF\u7269\u6765\u6E90\u504F\u5C11\uFF0C\u56E0\u6B64\u5F00\u653E\u7814\u7A76\u5361\uFF0C\u800C\u975E\u5224\u65AD\u7F3A\u9541\u3002",
          foodFirst: "\u8C46\u7C7B\u3001\u5168\u8C37\u3001\u575A\u679C\u79CD\u5B50\u548C\u6DF1\u7EFF\u53F6\u83DC\u4ECD\u662F\u4F18\u5148\u6765\u6E90\u3002",
          boundary: "\u4E0D\u80FD\u5199\u6210\u6CBB\u7597\u5931\u7720\u6216\u7126\u8651\uFF0C\u4E5F\u4E0D\u80FD\u628A\u76D0\u603B\u91CD\u5F53\u5143\u7D20\u9541\uFF1B\u7528\u836F\u6216\u80BE\u810F\u95EE\u9898\u9700\u4E13\u4E1A\u786E\u8BA4\u3002",
          matchedGoals: ["sleep", "stress"].filter((id) => activeGoals.has(id))
        });
      } else if (activeGoals.has("sleep") || activeGoals.has("stress")) {
        decline("magnesium_symptom_only", "\u7761\u4E0D\u597D\u6216\u538B\u529B\u5927\uFF0C\u4E0D\u7B49\u4E8E\u9700\u8981\u5148\u8865\u9541", "\u75C7\u72B6\u672C\u8EAB\u4E0D\u80FD\u63A8\u51FA\u9541\u7F3A\u4E4F\uFF1B\u5F53\u524D\u98DF\u7269\u6765\u6E90\u7B5B\u67E5\u4E5F\u6CA1\u6709\u5F62\u6210\u660E\u786E\u7684\u9541\u6765\u6E90\u7F3A\u53E3\u3002", ["sleep", "stress"].filter((id) => activeGoals.has(id)));
      }
      if (activeGoals.has("brain")) {
        foundation("brain_fog_foundations", "\u8111\u96FE\u5148\u6392\u67E5\u57FA\u7840\u539F\u56E0", "\u5148\u770B\u7761\u7720\u673A\u4F1A\u3001\u665A\u95F4\u5496\u5561\u56E0\u3001\u8FDB\u9910\u7A33\u5B9A\u6027\u3001\u538B\u529B\u4E0E\u6301\u7EED\u5F71\u54CD\uFF1B\u75C7\u72B6\u4E0D\u80FD\u76F4\u63A5\u6362\u6210\u8865\u5242\u3002", ["brain"]);
        research("brain_fog_magnesium_threonate_creatine", "\u5173\u4E8E\u82CF\u7CD6\u9178\u9541\u548C\u808C\u9178\uFF1A\u5148\u4E86\u89E3\u8BC1\u636E\u8FB9\u754C", {
          evidence: "\u7814\u7A76\u8FDB\u5C55\uFF0C\u8BC1\u636E\u4E0D\u8DB3",
          why: "\u7528\u6237\u4E3B\u52A8\u9009\u62E9\u8111\u96FE/\u8BA4\u77E5\u76EE\u6807\uFF0C\u56E0\u6B64\u5F00\u653E\u673A\u5236\u548C\u7814\u7A76\u8FB9\u754C\u8BF4\u660E\u3002",
          foodFirst: "\u5148\u5904\u7406\u7761\u7720\u3001\u89C4\u5F8B\u8FDB\u9910\u3001\u8BAD\u7EC3\u6062\u590D\u7B49\u66F4\u57FA\u7840\u7684\u53EF\u6539\u53D8\u56E0\u7D20\u3002",
          boundary: "\u82CF\u7CD6\u9178\u9541\u548C\u808C\u9178\u90FD\u4E0D\u4F1A\u4EC5\u56E0\u8111\u96FE\u8FDB\u5165\u81EA\u52A8\u63A8\u8350\uFF0C\u4E5F\u4E0D\u8BBE\u7F6E\u6240\u8C13\u201C\u8111\u96FE\u5242\u91CF\u201D\u3002",
          matchedGoals: ["brain"]
        });
      }
      if (activeGoals.has("skin")) {
        research("collagen_peptides_skin", "\u5173\u4E8E\u80F6\u539F\u80BD\uFF1A\u5B83\u66F4\u9002\u5408\u88AB\u5F53\u4F5C\u53EF\u9009\u9879", {
          evidence: "\u4F4E\u4F18\u5148\u7EA7\u3001\u6548\u679C\u4E0D\u786E\u5B9A",
          why: "\u5065\u5EB7\u6210\u4EBA\u4E3B\u52A8\u9009\u62E9\u76AE\u80A4\u6C34\u5408\u6216\u5F39\u6027\u76EE\u6807\u3002",
          foodFirst: "\u603B\u86CB\u767D\u3001\u5747\u8861\u996E\u98DF\u3001\u9632\u6652\u548C\u57FA\u7840\u76AE\u80A4\u62A4\u7406\u4F18\u5148\u3002",
          boundary: "\u4E0D\u80FD\u66FF\u4EE3\u76AE\u80A4\u75C5\u5904\u7406\uFF0C\u4E5F\u4E0D\u56E0\u8131\u53D1\u6216\u8106\u7532\u81EA\u52A8\u63A8\u8350\u3002",
          matchedGoals: ["skin"]
        });
      }
      if (activeGoals.has("eyes")) {
        research("lutein_screen_education", "\u5173\u4E8E\u53F6\u9EC4\u7D20\uFF1A\u5C4F\u5E55\u7528\u773C\u4E0D\u7B49\u4E8E\u5FC5\u987B\u8865", {
          evidence: "\u4E00\u822C\u5C4F\u5E55\u573A\u666F\u8BC1\u636E\u6709\u9650",
          why: "\u7528\u6237\u4E3B\u52A8\u4E86\u89E3\u5C4F\u5E55\u4E0E\u773C\u775B\u8425\u517B\uFF0C\u56E0\u6B64\u53EA\u5F00\u653E\u8BC1\u636E\u8BF4\u660E\u3002",
          foodFirst: "\u89C4\u5F8B\u4F11\u606F\u3001\u5408\u9002\u7167\u660E\u3001\u9A8C\u5149\u4E0E\u6DF1\u7EFF\u53F6\u83DC\u7B49\u98DF\u7269\u6765\u6E90\u4F18\u5148\u3002",
          boundary: "\u513F\u7AE5\u7528\u773C\u3001\u8FD1\u89C6\u6216\u9AD8\u5C4F\u5E55\u65F6\u957F\u4E0D\u6784\u6210\u81EA\u52A8\u8865\u5145\u7406\u7531\uFF1BAREDS2 \u53EA\u5C5E\u4E8E\u7279\u5B9A\u773C\u79D1\u8DEF\u5F84\u3002",
          matchedGoals: ["eyes"]
        });
        decline("lutein_not_automatic", "\u5C4F\u5E55\u7528\u773C\uFF0C\u5148\u522B\u6025\u7740\u4E70\u53F6\u9EC4\u7D20", "\u4E00\u822C\u5C4F\u5E55\u75B2\u52B3\u6216\u513F\u7AE5\u7528\u773C\u6CA1\u6709\u8DB3\u591F\u4F9D\u636E\u81EA\u52A8\u751F\u6210\u53F6\u9EC4\u7D20\u8865\u5145\u65B9\u6848\u3002", ["eyes"]);
      }
      if (activeGoals.has("bone") && loads.has("indoor_days")) {
        research("vitamin_d_status_review", "\u7EF4\u751F\u7D20 D\uFF1A\u6765\u6E90\u3001\u5B63\u8282\u4E0E\u5FC5\u8981\u65F6\u68C0\u6D4B", {
          evidence: "\u9700\u8981\u8FDB\u4E00\u6B65\u8BC4\u4F30",
          why: "\u9AA8\u9ABC\u76EE\u6807\u53E0\u52A0\u767D\u5929\u5927\u591A\u5728\u5BA4\u5185\uFF0C\u56E0\u6B64\u503C\u5F97\u4E86\u89E3\u6765\u6E90\u4E0E\u72B6\u6001\u8BC4\u4F30\u3002",
          foodFirst: "\u5148\u770B\u996E\u98DF\u6765\u6E90\u3001\u6237\u5916\u6761\u4EF6\u548C\u5B9E\u9645\u751F\u6D3B\u73AF\u5883\u3002",
          boundary: "\u95EE\u5377\u4E0D\u80FD\u5224\u65AD\u8840\u6DB2\u72B6\u6001\uFF0C\u4E5F\u4E0D\u4F1A\u628A\u7EF4\u751F\u7D20 D \u4F5C\u4E3A\u4EBA\u4EBA\u90FD\u8981\u8865\u7684\u9ED8\u8BA4\u7B54\u6848\u3002",
          matchedGoals: ["bone"]
        });
      }
      if (activeGoals.has("fatigue")) {
        decline("fatigue_iron_b_complex", "\u75B2\u52B3\u65F6\uFF0C\u5148\u522B\u6025\u7740\u4E70\u94C1\u6216\u7EF4 B", "\u75B2\u52B3\u539F\u56E0\u5F88\u591A\uFF0C\u4E0D\u80FD\u7528\u75C7\u72B6\u5224\u65AD\u7F3A\u94C1\u6216\u7F3A B \u65CF\uFF1B\u6301\u7EED\u6216\u660E\u663E\u5F71\u54CD\u529F\u80FD\u65F6\u5E94\u8FDB\u4E00\u6B65\u8BC4\u4F30\u3002", ["fatigue"]);
      }
      if (activeGoals.has("hair")) {
        decline("hair_biotin_iron", "\u8131\u53D1\u6216\u8106\u7532\uFF0C\u5148\u522B\u81EA\u884C\u8865\u751F\u7269\u7D20\u6216\u94C1", "\u8131\u53D1\u548C\u8106\u7532\u4E0D\u80FD\u8BC1\u660E\u7F3A\u4E4F\uFF1B\u751F\u7269\u7D20\u8FD8\u4F1A\u5E72\u6270\u808C\u9499\u86CB\u767D\u3001\u7532\u529F\u7B49\u5316\u9A8C\u3002", ["hair"]);
      }
      if (activeGoals.has("joint")) {
        decline("joint_stack", "\u5173\u8282\u4E0D\u9002\uFF0C\u5148\u522B\u628A\u6C28\u7CD6\u6216\u5173\u8282\u80F6\u539F\u5F53\u7B54\u6848", "\u5173\u8282\u54CD\u3001\u8FD0\u52A8\u9178\u75DB\u4E0E\u6025\u4F24\u4E0D\u662F\u81EA\u52A8\u8865\u5145\u4F9D\u636E\uFF1B\u7EA2\u80BF\u70ED\u75DB\u6216\u4E0D\u80FD\u8D1F\u91CD\u9700\u5148\u5C31\u533B\u3002", ["joint"]);
      }
      if (activeGoals.has("gut") && !baseResult.allMatches.some((item) => item.matchedGoals.includes("gut"))) {
        decline("generic_probiotic", "\u80A0\u9053\u95EE\u9898\uFF0C\u5148\u4E0D\u6CDB\u63A8\u76CA\u751F\u83CC", "\u76CA\u751F\u83CC\u9700\u8981\u5339\u914D\u5177\u4F53\u83CC\u682A\u548C\u7ED3\u5C40\uFF1B\u4EC5\u51ED\u201C\u80A0\u9053\u5065\u5EB7\u201D\u4E0D\u8DB3\u4EE5\u63A8\u8350\u3002", ["gut"]);
      }
      if (activeGoals.has("cardiometabolic")) {
        decline("cardiometabolic_products", "\u8840\u8102\u6216\u8840\u7CD6\u76F8\u5173\u95EE\u9898\uFF0C\u4E0D\u5728\u8FD9\u91CC\u914D\u4EA7\u54C1", "\u8840\u8102\u3001\u8840\u7CD6\u3001\u4F53\u91CD\u548C\u5FC3\u8840\u7BA1\u95EE\u9898\u5C5E\u4E8E\u75BE\u75C5\u98CE\u9669\u7BA1\u7406\uFF0C\u95EE\u5377\u53EA\u505A\u4E00\u822C\u6559\u80B2\u3002", ["cardiometabolic"]);
      }
      if (activeGoals.has("immunity")) {
        decline("immune_megadoses", "\u201C\u589E\u5F3A\u514D\u75AB\u201D\u4E0D\u662F\u76F4\u63A5\u4E70\u5927\u5242\u91CF\u7EF4\u77FF\u7684\u7406\u7531", "\u611F\u5192\u6216\u514D\u75AB\u76EE\u6807\u4E0D\u80FD\u76F4\u63A5\u63A8\u51FA\u9AD8\u5242\u91CF\u7EF4 C\u3001\u950C\u3001\u7EF4 D \u6216\u8349\u672C\u4EA7\u54C1\u3002", ["immunity"]);
      }
      if (activeGoals.has("life_stage")) {
        decline("life_stage_adult_path", "\u751F\u547D\u9636\u6BB5\u8425\u517B\uFF0C\u8981\u8D70\u4E13\u95E8\u8DEF\u5F84", "\u513F\u7AE5\u3001\u5B55\u54FA\u548C\u8001\u5E74\u4E0D\u80FD\u5957\u7528\u666E\u901A\u6210\u4EBA\u529F\u80FD\u8865\u5242\u4E0E\u5242\u91CF\u903B\u8F91\u3002", ["life_stage"]);
      }
      if (activeGoals.has("strength") && !explicitStrength) {
        decline("strength_without_training", "\u60F3\u589E\u808C\u524D\uFF0C\u5148\u628A\u8BAD\u7EC3\u6761\u4EF6\u8BF4\u6E05\u695A", "\u8FD8\u6CA1\u6709\u786E\u8BA4\u89C4\u5F8B\u529B\u91CF/\u9AD8\u5F3A\u5EA6\u8BAD\u7EC3\u6761\u4EF6\uFF0C\u76EE\u6807\u672C\u8EAB\u4E0D\u8DB3\u4EE5\u751F\u6210\u8FD0\u52A8\u8865\u5242\u3002", ["strength"]);
      }
      if (activeGoals.has("endurance") && !explicitEndurance && !prolongedSweat) {
        decline("electrolytes_without_condition", "\u666E\u901A\u77ED\u65F6\u6D3B\u52A8\uFF0C\u5148\u4E0D\u9700\u8981\u7535\u89E3\u8D28", "\u672A\u786E\u8BA4\u957F\u65F6\u8010\u529B\u8BAD\u7EC3\u6216\u8FDE\u7EED\u5927\u91CF\u51FA\u6C57\u4E14\u8FDB\u9910\u53D7\u9650\uFF1B\u666E\u901A\u77ED\u65F6\u6D3B\u52A8\u901A\u5E38\u5148\u7528\u6C34\u548C\u6B63\u9910\u3002", ["endurance"]);
      }
      if (activeGoals.has("bone") && !baseResult.allMatches.some((item) => item.matchedGoals.includes("bone")) && !baseResult.researchCards.some((item) => item.matchedGoals.includes("bone"))) {
        decline("bone_goal_without_source_gap", "\u5173\u5FC3\u9AA8\u9ABC\uFF0C\u4E5F\u5148\u4E0D\u6025\u7740\u8865\u9499\u6216\u7EF4\u751F\u7D20 D", "\u9700\u8981\u5148\u770B\u98DF\u7269\u6765\u6E90\u3001\u751F\u547D\u9636\u6BB5\u3001\u73AF\u5883\u548C\u5FC5\u8981\u65F6\u7684\u4E13\u4E1A\u8D44\u6599\u3002", ["bone"]);
      }
      if (activeGoals.has("diet_coverage") && !baseResult.allMatches.some((item) => item.matchedGoals.includes("diet_coverage"))) {
        decline("diet_no_blanket_stack", "\u5168\u9762\u76D8\u70B9\uFF0C\u4E0D\u7B49\u4E8E\u5148\u4E70\u201C\u4E00\u6574\u5957\u201D", "\u5F53\u524D\u56DE\u7B54\u6CA1\u6709\u5F62\u6210\u8DB3\u591F\u660E\u786E\u7684\u5355\u9879\u6765\u6E90\u7F3A\u53E3\uFF1B\u9650\u5236\u996E\u98DF\u4E5F\u5FC5\u987B\u9010\u9879\u8BC4\u4F30\uFF0C\u800C\u4E0D\u662F\u81EA\u52A8\u5168\u8865\u3002", ["diet_coverage"]);
      }
      if (persistentImpact) {
        const symptomGoals = ["sleep", "stress", "fatigue", "brain", "gut", "skin", "hair", "eyes", "joint"].filter((goalId) => activeGoals.has(goalId));
        baseResult.researchCards.forEach((item) => {
          if (!(item.matchedGoals || []).some((goalId) => symptomGoals.includes(goalId))) return;
          item.evidence = "\u4EC5\u4F5C\u77E5\u8BC6\u8BF4\u660E";
          item.boundary = `\u8FD9\u4E9B\u56F0\u6270\u5DF2\u660E\u663E\u5F71\u54CD\u751F\u6D3B\uFF0C\u5E94\u5148\u8BC4\u4F30\u6301\u7EED\u539F\u56E0\u3002${item.boundary || ""}`;
        });
        if (symptomGoals.length) {
          decline(
            "persistent_impact_assessment",
            "\u5148\u8BC4\u4F30\u6301\u7EED\u4E14\u5F71\u54CD\u529F\u80FD\u7684\u56F0\u6270",
            "\u95EE\u5377\u4E0D\u80FD\u5224\u65AD\u75C5\u56E0\uFF1B\u5728\u539F\u56E0\u672A\u660E\u786E\u524D\uFF0C\u4E0D\u628A\u75C7\u72B6\u578B\u7814\u7A76\u6210\u5206\u5F53\u4F5C\u8865\u5145\u65B9\u5411\u3002",
            symptomGoals
          );
        }
      }
      blockedTargets.forEach((goalId) => {
        if (!selectedGoals.includes(goalId)) return;
        decline(`blocked_${goalId}`, `${GOAL_LABELS[goalId] || goalId}\uFF1A\u5148\u6682\u505C\u8865\u5242\u5339\u914D`, "\u76F8\u5173\u7EA2\u65D7\u4FE1\u53F7\u9700\u8981\u5C3D\u5FEB\u7531\u4E13\u4E1A\u4EBA\u5458\u8BC4\u4F30\uFF1B\u8BE5\u76EE\u6807\u4E0D\u4F1A\u663E\u793A\u8865\u5242\u6216\u7814\u7A76\u5019\u9009\u3002", [goalId]);
      });
      baseResult.allMatches.sort((a, b) => a.priority - b.priority);
      baseResult.topActions = baseResult.allMatches.slice(0, 3);
      selectedGoals.forEach((goalId) => {
        const matchedRefs = [];
        baseResult.allMatches.forEach((item) => {
          if ((item.matchedGoals || []).includes(goalId)) matchedRefs.push(item.id);
        });
        baseResult.researchCards.forEach((item) => {
          if ((item.matchedGoals || []).includes(goalId)) matchedRefs.push(item.id);
        });
        const declinedRefs = baseResult.notRecommended.filter((item) => (item.matchedGoals || []).includes(goalId)).map((item) => item.id);
        let status = "not_recommended";
        if (blockedTargets.has(goalId)) status = "blocked";
        else if (matchedRefs.length > 0) status = "matched";
        else if (goalId === OPTION_IDS.COMPREHENSIVE_GOAL && baseResult.allMatches.length > 0) status = "matched";
        baseResult.targetCoverage.push({
          goalId,
          goalLabel: GOAL_LABELS[goalId] || goalId,
          status,
          referenceIds: status === "matched" && goalId === OPTION_IDS.COMPREHENSIVE_GOAL && matchedRefs.length === 0 ? baseResult.allMatches.map((item) => item.id) : Array.from(/* @__PURE__ */ new Set([...matchedRefs, ...declinedRefs]))
        });
      });
      if (activeGoals.has(OPTION_IDS.COMPREHENSIVE_GOAL) && baseResult.allMatches.length === 0) {
        decline("comprehensive_no_blanket_stack", "\u8FD9\u6B21\u5148\u628A\u996E\u98DF\u5E95\u76D8\u7406\u6E05\uFF0C\u4E0D\u7528\u8865\u5242\u51D1\u201C\u5168\u9762\u201D", "\u6CA1\u6709\u660E\u786E\u6765\u6E90\u7F3A\u53E3\u6216\u8BAD\u7EC3\u6761\u4EF6\u65F6\uFF0C\u4E0D\u7528\u590D\u5408\u7EF4\u751F\u7D20\u6216\u529F\u80FD\u6210\u5206\u51D1\u201C\u5168\u9762\u201D\u3002", [OPTION_IDS.COMPREHENSIVE_GOAL]);
        const coverage = baseResult.targetCoverage.find((item) => item.goalId === OPTION_IDS.COMPREHENSIVE_GOAL);
        if (coverage) coverage.referenceIds.push("comprehensive_no_blanket_stack");
      }
      return baseResult;
    }
    module.exports = {
      normalizeMultiAnswer: normalizeMultiAnswer2,
      validateStep: validateStep2,
      getSafetyDisposition: getSafetyDisposition2,
      buildQuestionPlan: buildQuestionPlan2,
      buildQuestionnaireResult
    };
  }
});

// resources/bubu-source/engine/recommendations-v5.js
var require_recommendations_v5 = __commonJS({
  "resources/bubu-source/engine/recommendations-v5.js"(exports, module) {
    "use strict";
    var { NUTRIENTS: NUTRIENTS2, sourceUrl } = require_intake_screening();
    var list = (v) => Array.isArray(v) ? v : [];
    var has = (v, id) => list(v).includes(id);
    var SOURCES = Object.fromEntries(NUTRIENTS2.map((n) => [n.id, { title: `NIH ODS \xB7 ${n.title}`, url: sourceUrl(n.slug) }]));
    Object.assign(SOURCES, {
      omega3: { title: "NIH ODS \xB7 Omega-3", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" },
      sport: { title: "NIH ODS \xB7 \u8FD0\u52A8\u8425\u517B", url: "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/" },
      sleep: { title: "NHLBI \xB7 \u7761\u7720\u4E0E\u5931\u7720", url: "https://www.nhlbi.nih.gov/health/insomnia/treatment" },
      eyes: { title: "NEI \xB7 AREDS2 \u9002\u7528\u8303\u56F4", url: "https://www.nei.nih.gov/eye-health-information/clinical-trials/age-related-eye-disease-studies-aredsareds2/aredsareds2-frequently-asked-questions" },
      collagen: { title: "2025 \u5E74\u80F6\u539F\u4E0E\u76AE\u80A4\u7814\u7A76\u7EFC\u8FF0", url: "https://pubmed.ncbi.nlm.nih.gov/40324552/" },
      probiotics: { title: "NCCIH \xB7 \u76CA\u751F\u83CC", url: "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety" }
    });
    var TAGS = { food: "\u5148\u9760\u996E\u98DF\u8865\u8DB3", supplement: "\u503C\u5F97\u8003\u8651\u8865\u5145", optional: "\u6309\u76EE\u6807\u53EF\u9009", check: "\u5148\u786E\u8BA4\u4E00\u4EF6\u4E8B", maintain: "\u4FDD\u7559\u73B0\u6709\u6765\u6E90", existing: "\u5DF2\u6709\u8865\u5145\u5B89\u6392" };
    function card(id, title, state, reason, action, supplement = "", details = [], sourceIds = [], caution = "") {
      return { id, title, state, tag: TAGS[state], reason, action, supplement, caution, details, sources: sourceIds.filter((id2) => SOURCES[id2]).map((id2) => ({ id: id2, title: SOURCES[id2].title })), expanded: false };
    }
    var d = (title, body) => ({ title, body });
    function buildPlanReport2(mode, a) {
      const detailed = mode === "detailed", q = a.quick_food || {}, dairy = a.dairy_food || {}, animal = a.animal_food || {}, plant = a.plant_food || {}, types = a.plant_types || {};
      const pref = a.preferences || {}, health = a.health_detail || {}, profile = a.profile || {}, training = a.training_detail || {}, goals = list(a.goals);
      const existing = list(a.existing_sources), conditions = list(health.conditions), meds = list(health.medicines), labs = list(a.labs), excluded = list(a.exclusions);
      const vegan = a.diet_style === "vegan", vegetarian = vegan || a.diet_style === "vegetarian", child = a.audience === "minor_under_18";
      const reproductive = ["planning", "pregnant", "lactating"].includes(profile.life_stage);
      if (child) {
        const cf = a.child_food || {}, cd = a.child_detail || {};
        const checks2 = [card("child_nutrition", "\u5B69\u5B50\u7684\u8425\u517B\u5B89\u6392", "check", cf.plan === "yes" ? "\u5B69\u5B50\u5DF2\u6709\u513F\u79D1\u7ED9\u51FA\u7684\u8865\u5145\u5B89\u6392\u3002" : "\u5B69\u5B50\u7684\u8425\u517B\u9700\u8981\u53D6\u51B3\u4E8E\u5E74\u9F84\u3001\u751F\u957F\u3001\u5976\u548C\u8F85\u98DF\u6216\u6B63\u9910\u3002", cf.plan === "yes" ? "\u7EE7\u7EED\u6309\u5DF2\u6709\u5B89\u6392\u6267\u884C\uFF0C\u628A\u8FDB\u98DF\u8BB0\u5F55\u5E26\u5230\u590D\u8BCA\uFF1B\u4E0D\u8981\u53E0\u52A0\u6210\u4EBA\u4EA7\u54C1\u3002" : "\u5148\u8BB0\u5F55\u51E0\u5929\u7684\u5976\u3001\u8F85\u98DF\u6216\u6B63\u9910\uFF0C\u6309\u5177\u4F53\u5E74\u9F84\u4E0E\u513F\u79D1\u786E\u8BA4\u9499\u3001\u94C1\u3001\u7EF4\u751F\u7D20 D \u7B49\u5B89\u6392\u3002")];
        if (cf.milk === "little") checks2.push(card("child_calcium", "\u9499\u7684\u98DF\u7269\u6765\u6E90", "check", "\u4F60\u63D0\u5230\u5B69\u5B50\u7684\u5976\u6216\u9002\u9F84\u66FF\u4EE3\u6765\u6E90\u6BD4\u8F83\u5C11\u3002", "\u7ED3\u5408\u51C6\u786E\u5E74\u9F84\u3001\u8FC7\u654F\u548C\u8FDB\u98DF\u60C5\u51B5\uFF0C\u786E\u8BA4\u9002\u5408\u7684\u5976\u6216\u66FF\u4EE3\u98DF\u7269\uFF0C\u4E0D\u5957\u7528\u6210\u4EBA\u4EFD\u91CF\u3002", "", [], ["calcium"]));
        if (cd.growth === "concern") checks2.unshift(card("child_growth", "\u5148\u786E\u8BA4\u751F\u957F\u4E0E\u8FDB\u98DF\u53D8\u5316", "check", "\u4F60\u63D0\u5230\u751F\u957F\u505C\u6EDE\u3001\u4F53\u91CD\u4E0B\u964D\u6216\u541E\u54BD\u56F0\u96BE\u3002", "\u8BF7\u53CA\u65F6\u5B89\u6392\u513F\u79D1\u8BC4\u4F30\uFF0C\u4E0D\u7528\u8425\u517B\u8865\u5145\u5242\u4EE3\u66FF\u68C0\u67E5\u3002"));
        return { version: "persona-inspired-v5-child", title: "\u5148\u770B\u5B69\u5B50\u7684\u8425\u517B\u6765\u6E90", summary: "\u8FD9\u662F\u76D1\u62A4\u4EBA\u586B\u5199\u7684\u996E\u98DF\u8BB0\u5F55\uFF0C\u4E0D\u5957\u7528\u6210\u4EBA\u8865\u5145\u65B9\u6848\u3002", cards: [], optional: [], checks: checks2, topics: [], coverage: [], coverageCount: 0, coverageExpanded: false, remainingCount: 0, showMore: false, topicsExpanded: false, highlights: [], emptyTitle: "\u6309\u5E74\u9F84\u548C\u751F\u957F\u60C5\u51B5\u5B89\u6392", emptyAction: cf.variety === "restricted" ? "\u8BB0\u5F55\u957F\u671F\u5403\u4E0D\u5230\u7684\u98DF\u7269\u548C\u80FD\u63A5\u53D7\u7684\u66FF\u4EE3\u6765\u6E90\uFF0C\u4F18\u5148\u4E0E\u513F\u79D1\u4E00\u8D77\u6838\u5BF9\u3002" : "\u4FDD\u7559\u9002\u9F84\u3001\u591A\u6837\u7684\u8FDB\u98DF\u5B89\u6392\uFF0C\u4E0B\u9762\u5217\u51FA\u672C\u6B21\u9700\u8981\u786E\u8BA4\u7684\u91CD\u70B9\u3002", disclaimer: "\u513F\u7AE5\u8865\u5145\u54C1\u548C\u7528\u91CF\u9700\u6309\u5E74\u9F84\u53CA\u5B9E\u9645\u60C5\u51B5\u786E\u8BA4\uFF1B\u4E0D\u5C55\u793A\u6210\u4EBA\u8FD0\u52A8\u3001\u51CF\u91CD\u6216\u901A\u7528\u8865\u8111\u7EC4\u5408\u3002", notice: null };
      }
      const restricted = conditions.some((id) => ["kidney", "food_limit"].includes(id)) || has(a.safety, "medical_food_restriction_quick");
      const unknownHealth = has(a.safety, "unknown") || has(a.safety, "surgery_or_reaction") || has(a.safety, "malabsorption_or_bariatric") || has(a.safety, "chronic_or_labs") && conditions.some((id) => ["unknown", "other", "liver"].includes(id)) || has(a.safety, "medication") && (!meds.length || meds.some((id) => ["unknown", "other"].includes(id)));
      const cannotAutoSupplement = child || reproductive || restricted || unknownHealth;
      const knownUnknownProduct = existing.some((id) => ["unknown", "other", "multivitamin"].includes(id));
      const direct = (id) => existing.includes(id) || /^b\d+$/.test(id) && existing.includes("b_complex");
      const state = (v) => ["zero", "small", "rare"].includes(v) ? "low" : ["regular", "large", "often"].includes(v) ? "source" : v === "some" ? "partial" : "unknown";
      const signals = {};
      const addSignal = (id, v, label) => {
        signals[id] = { state: state(v), label };
      };
      if (detailed) {
        for (const id of ["vegetables", "fruit", "whole_grains", "beans", "nuts"]) addSignal(id, plant[id], { vegetables: "\u852C\u83DC", fruit: "\u6C34\u679C", whole_grains: "\u5168\u8C37", beans: "\u6742\u8C46", nuts: "\u575A\u679C\u79CD\u5B50" }[id]);
        for (const id of ["greens", "orange", "potato"]) addSignal(id, types[id], { greens: "\u6DF1\u7EFF\u53F6\u83DC", orange: "\u6A59\u9EC4\u8272\u852C\u679C", potato: "\u85AF\u7C7B" }[id]);
        addSignal("milk", ["dairy"].includes(dairy.kind) ? dairy.amount : ["none", "unfortified", "fortified"].includes(dairy.kind) ? "zero" : void 0, "\u5976\u7C7B");
        addSignal("calcium_drink", ["dairy", "fortified"].includes(dairy.kind) ? dairy.amount : ["none", "unfortified"].includes(dairy.kind) ? "zero" : void 0, "\u5976\u6216\u52A0\u9499\u996E\u54C1");
        addSignal("tofu", dairy.tofu, "\u8C46\u5236\u54C1");
        addSignal("calcium_tofu", dairy.tofu === "zero" || dairy.tofu_kind === "none" ? "zero" : dairy.tofu_kind === "calcium" ? dairy.tofu : void 0, "\u542B\u9499\u8C46\u8150");
        addSignal("meat", animal.meat, "\u8089\u3001\u79BD\u3001\u9C7C\u867E");
        addSignal("red_meat", animal.red_meat, "\u7EA2\u8089\u6216\u8D1D\u7C7B");
        addSignal("eggs", animal.eggs, "\u5168\u86CB");
        addSignal("fish", animal.fish, "\u5BCC\u8102\u9C7C");
        addSignal("seafood", animal.red_meat, "\u8089\u6216\u8D1D\u7C7B");
        addSignal("oil", (a.cooking || {}).oil === "plant" ? "often" : ["animal", "little"].includes((a.cooking || {}).oil) ? "zero" : void 0, "\u690D\u7269\u6CB9");
        addSignal("iodized_salt", (a.cooking || {}).salt === "iodized" ? "often" : (a.cooking || {}).salt === "non_iodized" ? "zero" : void 0, "\u52A0\u7898\u76D0");
      } else {
        addSignal("calcium_drink", q.calcium, "\u4E3B\u8981\u542B\u9499\u98DF\u7269");
        addSignal("fish", q.fish, "\u5BCC\u8102\u9C7C");
        addSignal("b12_quick", q.b12, "B12 \u98DF\u7269");
        addSignal("vegetables", q.vegetables, "\u852C\u83DC");
        addSignal("fruit", q.fruit, "\u6C34\u679C");
        for (const id of ["whole_grains", "beans", "nuts", "greens"]) addSignal(id, q.magnesium, "\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u575A\u679C\u548C\u7EFF\u53F6\u83DC");
      }
      for (const id of ["d_fortified", "b12_fortified"]) {
        const key = id === "d_fortified" ? "vitamin_d" : "b12";
        addSignal(id, has(a.fortified, key) ? "often" : has(a.fortified, "none") ? "zero" : void 0, `${key === "b12" ? "B12" : "\u7EF4\u751F\u7D20 D"} \u5F3A\u5316\u98DF\u54C1`);
      }
      const get = (id) => (signals[id] || { state: "unknown", label: id }).state;
      const allLow = (ids) => ids.every((id) => get(id) === "low");
      const anySource = (ids) => ids.some((id) => get(id) === "source");
      const inconsistent = vegan && (detailed ? dairy.kind === "dairy" && dairy.amount !== "zero" || animal.meat === "regular" || animal.eggs === "often" || animal.fish === "often" : q.b12 === "often" && !has(a.fortified, "b12"));
      const rows = [], checks = [], optional = [], topics = [];
      const acceptableFoods = (n) => {
        const replacements = {
          calcium: excluded.includes("dairy") || vegan ? "\u6807\u7B7E\u660E\u786E\u52A0\u9499\u7684\u690D\u7269\u996E\u54C1\u3001\u5408\u9002\u7684\u542B\u9499\u98DF\u7269" : "\u725B\u5976\u3001\u9178\u5976\u3001\u52A0\u9499\u690D\u7269\u996E\u54C1\u6216\u542B\u9499\u8C46\u8150",
          b12: vegan ? "\u660E\u786E\u5F3A\u5316 B12 \u7684\u98DF\u54C1" : "\u8089\u3001\u9C7C\u3001\u86CB\u3001\u5976\u6216\u660E\u786E\u5F3A\u5316 B12 \u7684\u98DF\u54C1",
          omega3: vegan || excluded.includes("fish") ? "\u85FB\u6CB9\u7B49\u975E\u9C7C\u7C7B\u6765\u6E90" : "\u4E09\u6587\u9C7C\u3001\u6C99\u4E01\u9C7C\u3001\u9CAD\u9C7C\u7B49\u5BCC\u8102\u9C7C",
          magnesium: "\u5168\u8C37\u6742\u7CAE\u3001\u6742\u8C46\u3001\u6DF1\u7EFF\u53F6\u83DC" + (excluded.includes("nuts") ? "" : "\u548C\u575A\u679C\u79CD\u5B50"),
          potassium: "\u852C\u83DC\u3001\u6C34\u679C\u3001\u85AF\u7C7B\u548C\u6742\u8C46",
          iron: vegetarian ? "\u6742\u8C46\u3001\u8C46\u5236\u54C1\uFF0C\u642D\u914D\u542B\u7EF4\u751F\u7D20 C \u7684\u852C\u679C" : "\u7626\u8089\u6216\u5408\u9002\u7684\u8C46\u7C7B\uFF0C\u642D\u914D\u65B0\u9C9C\u852C\u679C",
          protein: vegetarian ? excluded.includes("soy") ? "\u53EF\u8010\u53D7\u7684\u6742\u8C46\u3001\u5168\u8C37\u548C\u79CD\u5B50" : "\u8C46\u8150\u3001\u8C46\u7C7B\u53CA\u5176\u4ED6\u53EF\u8010\u53D7\u7684\u86CB\u767D\u98DF\u7269" : "\u4F60\u80FD\u5403\u7684\u86CB\u3001\u5976\u3001\u8089\u3001\u9C7C\u6216\u8C46\u5236\u54C1"
        };
        let text = replacements[n.id] || n.sources;
        if (excluded.includes("soy")) text = text.replace(/、?豆腐|、?豆制品|、?大豆制品/g, "");
        return text;
      };
      const addCheck = (id, title, reason, action, sourceIds = [], caution = "") => checks.push(card(id, title, "check", reason, action, "", [], sourceIds, caution));
      if (has(a.safety, "persistent_symptoms")) addCheck("persistent_symptoms", "\u6301\u7EED\u5F71\u54CD\u751F\u6D3B\u7684\u4E0D\u9002", "\u4F60\u63D0\u5230\u8FD1\u671F\u4E0D\u9002\u5DF2\u6301\u7EED\u5E76\u5F71\u54CD\u65E5\u5E38\u751F\u6D3B\u3002", "\u8BF7\u5B89\u6392\u5C31\u533B\u786E\u8BA4\u539F\u56E0\uFF1B\u4EE5\u4E0B\u996E\u98DF\u5EFA\u8BAE\u4E0D\u66FF\u4EE3\u8FD9\u4E00\u6B65\u3002");
      if (inconsistent) addCheck("diet_consistency", "\u6838\u5BF9\u7D20\u98DF\u4E0E\u98DF\u7269\u8BB0\u5F55", "\u4F60\u9009\u62E9\u4E86\u7EAF\u7D20\uFF0C\u4F46\u90E8\u5206\u98DF\u7269\u56DE\u7B54\u53EF\u80FD\u5305\u542B\u52A8\u7269\u6027\u6765\u6E90\u3002", "\u8BF7\u8FD4\u56DE\u6838\u5BF9\u996E\u98DF\u65B9\u5F0F\uFF1B\u5982\u679C\u5403\u7684\u662F\u5F3A\u5316\u66FF\u4EE3\u54C1\uFF0C\u628A\u5B83\u8BB0\u5728\u5BF9\u5E94\u7684\u5F3A\u5316\u6765\u6E90\u91CC\u3002");
      for (const n of NUTRIENTS2) {
        let s = "check", reason = "\u8FD9\u6B21\u8FD8\u6CA1\u6709\u786E\u8BA4\u4E3B\u8981\u98DF\u7269\u7684\u79CD\u7C7B\u548C\u4EFD\u91CF\u3002", action = `\u5148\u8BB0\u5F55${acceptableFoods(n)}\u7684\u5B9E\u9645\u5403\u6CD5\u3002`, supplement = "", caution = "";
        let certainty = 0, essential = false;
        const rule = (ids) => {
          if (allLow(ids)) {
            s = "food";
            certainty = 2;
            reason = `\u4F60\u586B\u5199\u7684${ids.map((id) => signals[id].label).filter((v, i, all) => all.indexOf(v) === i).join("\u3001")}\u90FD\u6BD4\u8F83\u5C11\u3002`;
          } else if (anySource(ids)) {
            s = "maintain";
            reason = "\u4F60\u5DF2\u7ECF\u6709\u8F83\u7A33\u5B9A\u7684\u76F8\u5173\u98DF\u7269\u6765\u6E90\uFF1B\u7EE7\u7EED\u4FDD\u7559\uFF0C\u4EFD\u91CF\u8FD8\u8981\u7ED3\u5408\u5168\u5929\u996E\u98DF\u6765\u770B\u3002";
          } else reason = "\u90E8\u5206\u6765\u6E90\u9891\u7387\u6216\u4EFD\u91CF\u8FD8\u4E0D\u6E05\u695A\uFF0C\u5148\u786E\u8BA4\u518D\u51B3\u5B9A\u662F\u5426\u8C03\u6574\u3002";
        };
        if (n.id === "calcium") {
          const alternatives = list(a.calcium_alternatives);
          const noAlt = alternatives.includes("none");
          if (anySource(["calcium_drink", "calcium_tofu"])) {
            s = "maintain";
            reason = "\u4F60\u5DF2\u7ECF\u6709\u89C4\u5F8B\u7684\u5976\u3001\u52A0\u9499\u996E\u54C1\u6216\u542B\u9499\u8C46\u8150\u6765\u6E90\uFF0C\u4E0D\u9700\u8981\u56E0\u4E3A\u5C11\u559D\u67D0\u4E00\u79CD\u5976\u5C31\u53E6\u4E70\u9499\u7247\u3002";
          } else if ((detailed ? allLow(["calcium_drink", "calcium_tofu"]) : get("calcium_drink") === "low") && noAlt) {
            s = "food";
            certainty = 2;
            reason = "\u4F60\u5E38\u5403\u7684\u4E3B\u8981\u542B\u9499\u98DF\u7269\u6BD4\u8F83\u5C11\uFF0C\u4E5F\u6CA1\u6709\u56FA\u5B9A\u7684\u53EF\u9760\u66FF\u4EE3\u6765\u6E90\u3002";
          } else reason = alternatives.some((id) => !["none", "unknown"].includes(id)) ? "\u4F60\u6709\u5176\u4ED6\u542B\u9499\u98DF\u7269\uFF0C\u5148\u770B\u6807\u7B7E\u542B\u91CF\u548C\u6BCF\u6B21\u4EFD\u91CF\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u9700\u8981\u9499\u7247\u3002" : "\u5148\u786E\u8BA4\u996E\u54C1\u662F\u5426\u52A0\u9499\u3001\u8C46\u8150\u7684\u79CD\u7C7B\u548C\u66FF\u4EE3\u98DF\u7269\u7684\u4EFD\u91CF\u3002";
          action = `\u6BCF\u5929\u5B89\u6392\u4E00\u79CD\u4F60\u80FD\u575A\u6301\u7684\u542B\u9499\u98DF\u7269\uFF0C\u4F8B\u5982${acceptableFoods(n)}\u3002`;
          supplement = "\u8C03\u6574\u540E\u4ECD\u96BE\u7A33\u5B9A\u8986\u76D6\u65F6\uFF0C\u518D\u8003\u8651\u9499\u8865\u5145\u5242\uFF1B\u770B\u6E05\u5143\u7D20\u9499\u542B\u91CF\uFF0C\u5E76\u628A\u5DF2\u6709\u4EA7\u54C1\u4E00\u8D77\u7B97\u4E0A\u3002";
          if (s === "food" && pref.calcium === "no" && pref.approach !== "food") s = "supplement";
        } else if (n.id === "vitamin_d") {
          if (get("d_fortified") === "source") {
            s = "maintain";
            reason = "\u4F60\u6709\u56FA\u5B9A\u7684\u7EF4\u751F\u7D20 D \u5F3A\u5316\u98DF\u54C1\u6765\u6E90\uFF0C\u5148\u4FDD\u7559\u5E76\u6838\u5BF9\u6807\u7B7E\u542B\u91CF\u3002";
          } else if (get("fish") === "low" && get("d_fortified") === "low") {
            s = "food";
            certainty = 2;
            reason = `\u5BCC\u8102\u9C7C\u5403\u5F97\u5C11\uFF0C\u4E5F\u6CA1\u6709\u56FA\u5B9A\u7684\u7EF4\u751F\u7D20 D \u5F3A\u5316\u98DF\u54C1\u3002${a.daylight === "little" ? "\u4F60\u8FD8\u63D0\u5230\u591A\u6570\u65F6\u95F4\u5728\u5BA4\u5185\u3002" : ""}`;
            if (pref.approach !== "food") s = "supplement";
          } else reason = "\u9C7C\u7C7B\u3001\u5F3A\u5316\u98DF\u54C1\u6216\u6237\u5916\u60C5\u51B5\u4E2D\u4ECD\u6709\u672A\u786E\u8BA4\u7684\u4FE1\u606F\uFF0C\u5148\u6838\u5BF9\u73B0\u6709\u7EF4\u751F\u7D20 D \u6765\u6E90\u3002";
          action = "\u4F18\u5148\u6838\u5BF9\u660E\u786E\u5F3A\u5316\u7EF4\u751F\u7D20 D \u7684\u98DF\u54C1\uFF1B\u80FD\u5403\u9C7C\u65F6\uFF0C\u4E5F\u53EF\u5B89\u6392\u5BCC\u8102\u9C7C\u3002\u5929\u7136\u98DF\u7269\u6765\u6E90\u76F8\u5BF9\u6709\u9650\u3002";
          supplement = "\u6765\u6E90\u957F\u671F\u4E0D\u7A33\u5B9A\u65F6\uFF0C\u53EF\u4EE5\u4E86\u89E3\u9002\u9F84\u7684\u5E38\u89C4\u7EF4\u751F\u7D20 D \u8865\u5145\uFF1B\u4E0D\u81EA\u884C\u4F7F\u7528\u9AD8\u5242\u91CF\u6216\u51B2\u51FB\u5242\u91CF\u3002";
          caution = "\u4E0D\u7528\u523B\u610F\u66B4\u6652\uFF1B\u662F\u5426\u68C0\u6D4B\u7531\u4E2A\u4EBA\u98CE\u9669\u51B3\u5B9A\uFF0C\u4E0D\u56E0\u5BA4\u5185\u5DE5\u4F5C\u5C31\u5FC5\u987B\u62BD\u8840\u3002";
        } else if (n.id === "b12") {
          if (get("b12_fortified") === "source") {
            s = "maintain";
            reason = "\u4F60\u5DF2\u89C4\u5F8B\u98DF\u7528\u660E\u786E\u5F3A\u5316 B12 \u7684\u98DF\u54C1\uFF0C\u7EE7\u7EED\u6838\u5BF9\u6807\u7B7E\u542B\u91CF\u548C\u4F7F\u7528\u9891\u7387\u3002";
          } else if (vegan && !inconsistent && get("b12_fortified") === "low") {
            s = "supplement";
            essential = true;
            certainty = 3;
            reason = "\u4F60\u4E0D\u5403\u52A8\u7269\u6027\u98DF\u7269\uFF0C\u4E5F\u6CA1\u6709\u56FA\u5B9A\u7684 B12 \u5F3A\u5316\u6765\u6E90\uFF1B\u8FD9\u4E00\u9879\u9700\u8981\u5EFA\u7ACB\u53EF\u9760\u7684\u957F\u671F\u5B89\u6392\u3002";
          } else if (detailed) rule(["meat", "milk", "eggs", "fish", "b12_fortified"]);
          else if (get("b12_quick") === "source") {
            s = "maintain";
            reason = "\u4F60\u8868\u793A B12 \u98DF\u7269\u6765\u6E90\u6BD4\u8F83\u89C4\u5F8B\uFF0C\u5148\u4FDD\u7559\u8FD9\u4E9B\u6765\u6E90\u3002";
          }
          action = vegan ? "\u9009\u62E9\u660E\u786E\u6807\u6CE8 B12 \u7684\u5F3A\u5316\u98DF\u54C1\uFF0C\u6216\u5B89\u6392\u9002\u5408\u4F60\u7684 B12 \u8865\u5145\u5242\u3002\u666E\u901A\u6D77\u85FB\u548C\u53D1\u9175\u98DF\u54C1\u4E0D\u80FD\u66FF\u4EE3\u3002" : `\u89C4\u5F8B\u5B89\u6392${acceptableFoods(n)}\u3002`;
          supplement = "\u957F\u671F\u7F3A\u5C11\u53EF\u9760\u6765\u6E90\u65F6\uFF0CB12 \u662F\u6BD4\u7B3C\u7EDF\u8865\u4E00\u6574\u5957\u66F4\u9700\u8981\u5148\u786E\u8BA4\u7684\u65B9\u5411\u3002";
        } else if (n.id === "magnesium") {
          rule(detailed ? ["whole_grains", "beans", "nuts", "greens"] : ["whole_grains"]);
          action = `\u6BCF\u5929\u4ECE${acceptableFoods(n)}\u4E2D\u9009\u4E24\u7C7B\uFF0C\u9010\u6B65\u52A0\u8FDB\u6B63\u9910\u3002`;
          supplement = "\u98DF\u7269\u957F\u671F\u96BE\u8986\u76D6\u65F6\u518D\u8003\u8651\u9541\uFF1B\u4EA7\u54C1\u5E94\u770B\u5143\u7D20\u9541\u542B\u91CF\uFF0C\u4E0D\u4EE5\u201C\u52A9\u7720\u201D\u201C\u8865\u8111\u201D\u7684\u540D\u5B57\u5224\u65AD\u6548\u679C\u3002";
        } else if (n.id === "potassium") {
          rule(detailed ? ["vegetables", "fruit", "beans", "potato", "milk"] : ["vegetables", "fruit"]);
          action = "\u628A\u852C\u83DC\u3001\u6C34\u679C\u3001\u85AF\u7C7B\u548C\u6742\u8C46\u7A33\u5B9A\u5B89\u6392\u8FDB\u6B63\u9910\uFF0C\u5148\u4ECE\u98DF\u7269\u6539\u5584\u94BE\u6765\u6E90\u3002";
          supplement = "\u8FD9\u9879\u4EE5\u996E\u98DF\u4E3A\u4E3B\uFF0C\u4E0D\u5EFA\u8BAE\u628A\u94BE\u7247\u4F5C\u4E3A\u65E5\u5E38\u81EA\u884C\u8865\u5145\u3002";
        } else if (n.id === "vitamin_a") {
          if (detailed) rule(["greens", "orange", "eggs", "milk"]);
          action = "\u8F6E\u6362\u5B89\u6392\u6DF1\u7EFF\u53F6\u83DC\u3001\u80E1\u841D\u535C\u3001\u5357\u74DC\u7B49\u98DF\u7269\uFF0C\u5E76\u6309\u996E\u98DF\u65B9\u5F0F\u642D\u914D\u5176\u4ED6\u6765\u6E90\u3002";
          supplement = "\u76AE\u80A4\u6216\u7528\u773C\u76EE\u6807\u4E0D\u7B49\u4E8E\u9700\u8981\u989D\u5916\u7EF4\u751F\u7D20 A\uFF1B\u901A\u5E38\u5148\u8C03\u6574\u98DF\u7269\u3002";
          caution = "\u5907\u5B55\u3001\u5B55\u671F\u6216\u4F7F\u7528\u7EF4 A \u9178\u7C7B\u836F\u7269\u65F6\uFF0C\u4E0D\u81EA\u884C\u52A0\u7528\u7EF4\u751F\u7D20 A \u6216\u9C7C\u809D\u6CB9\u3002";
        } else if (n.id === "vitamin_c") {
          rule(["vegetables", "fruit"]);
          action = "\u6BCF\u5929\u5B89\u6392\u65B0\u9C9C\u852C\u83DC\u548C\u5B8C\u6574\u6C34\u679C\uFF0C\u4F8B\u5982\u5F69\u6912\u3001\u897F\u5170\u82B1\u3001\u67D1\u6A58\u6216\u7315\u7334\u6843\u3002";
          supplement = "\u80FD\u7A33\u5B9A\u5403\u5230\u852C\u679C\u65F6\uFF0C\u901A\u5E38\u5148\u6539\u5584\u996E\u98DF\uFF0C\u4E0D\u6025\u7740\u52A0\u5927\u5242\u91CF\u7EF4 C\u3002";
        } else if (n.id === "b9") {
          if (detailed) rule(["greens", "beans", "fruit"]);
          action = "\u6B63\u9910\u589E\u52A0\u6DF1\u7EFF\u53F6\u83DC\u548C\u8C46\u7C7B\uFF0C\u6C34\u679C\u4F5C\u4E3A\u65E5\u5E38\u642D\u914D\u3002";
        } else if (n.id === "iron") {
          if (detailed) rule(["red_meat", "beans", "greens"]);
          action = `\u5B89\u6392${acceptableFoods(n)}\uFF1B\u94C1\u5242\u8981\u7ED3\u5408\u5931\u8840\u60C5\u51B5\u548C\u68C0\u67E5\u518D\u51B3\u5B9A\u3002`;
          supplement = "\u4E0D\u51ED\u75B2\u52B3\u6216\u8131\u53D1\u76F4\u63A5\u52A0\u94C1\u3002";
        } else if (n.id === "iodine") {
          if (detailed) rule(["iodized_salt", "milk", "eggs", "fish"]);
          action = "\u770B\u770B\u98DF\u76D0\u662F\u5426\u6807\u6CE8\u52A0\u7898\uFF0C\u5E76\u6838\u5BF9\u5E73\u65F6\u7684\u86CB\u3001\u5976\u6216\u6D77\u4EA7\u54C1\u6765\u6E90\uFF1B\u4E0D\u4E3A\u4E86\u8865\u7898\u591A\u5403\u76D0\u3002";
          supplement = "\u4E0D\u9760\u6D77\u5E26\u3001\u6D77\u85FB\u7247\u6216\u7898\u7247\u81EA\u884C\u52A0\u91CF\u3002";
        } else if (n.id === "vitamin_e") {
          if (detailed) rule(["oil", "nuts"]);
          action = "\u9009\u62E9\u9002\u91CF\u7684\u690D\u7269\u6CB9\u548C\u53EF\u8010\u53D7\u7684\u575A\u679C\u79CD\u5B50\uFF0C\u907F\u514D\u957F\u671F\u6781\u7AEF\u4F4E\u8102\u3002";
        } else if (n.id === "vitamin_k") {
          if (detailed) rule(["greens", "vegetables"]);
          action = "\u4FDD\u6301\u7EFF\u53F6\u83DC\u6444\u5165\u76F8\u5BF9\u89C4\u5F8B\u3002";
        } else if (n.id === "b1") {
          if (detailed) rule(["whole_grains", "beans", "meat"]);
          action = "\u628A\u90E8\u5206\u7CBE\u5236\u4E3B\u98DF\u6362\u6210\u5168\u8C37\uFF0C\u5E76\u8F6E\u6362\u8C46\u7C7B\u53CA\u9002\u5408\u7684\u7626\u8089\u3002";
        } else if (n.id === "b2") {
          if (detailed) rule(["milk", "eggs", "meat", "greens"]);
          action = "\u5728\u80FD\u5403\u7684\u98DF\u7269\u4E2D\u8F6E\u6362\u5976\u3001\u5168\u86CB\u3001\u8089\u548C\u7EFF\u53F6\u83DC\u3002";
        } else if (n.id === "b6") {
          if (detailed) rule(["meat", "fish", "potato", "fruit"]);
          action = "\u8F6E\u6362\u9C7C\u8089\u3001\u85AF\u7C7B\u548C\u6C34\u679C\u7B49\u6765\u6E90\u3002";
          caution = "\u4E0D\u957F\u671F\u81EA\u884C\u670D\u7528\u9AD8\u5242\u91CF B6\uFF1B\u8FC7\u91CF\u53EF\u80FD\u635F\u4F24\u5468\u56F4\u795E\u7ECF\u3002";
        } else if (n.id === "zinc") {
          if (detailed) rule(["meat", "beans", "nuts", "milk"]);
          action = "\u8F6E\u6362\u8089\u7C7B\u3001\u8C46\u7C7B\u548C\u53EF\u8010\u53D7\u7684\u575A\u679C\u7B49\u6765\u6E90\uFF1B\u4E0D\u56E0\u4E3A\u76AE\u80A4\u95EE\u9898\u5C31\u5355\u72EC\u52A0\u950C\u3002";
        } else {
          const related = n.foods.filter((id) => signals[id]);
          if (related.length && anySource(related)) {
            s = "maintain";
            reason = "\u4F60\u6709\u76F8\u5173\u98DF\u7269\u6765\u6E90\uFF0C\u7EE7\u7EED\u4FDD\u6301\u591A\u6837\u642D\u914D\uFF1B\u672C\u6B21\u4E0D\u5355\u72EC\u589E\u52A0\u8FD9\u4E00\u9879\u3002";
          } else {
            s = "check";
            reason = "\u8FD9\u9879\u5206\u5E03\u5728\u591A\u79CD\u98DF\u7269\u4E2D\uFF0C\u5355\u9760\u672C\u6B21\u7C97\u7565\u8BB0\u5F55\u4E0D\u8DB3\u4EE5\u51B3\u5B9A\u662F\u5426\u989D\u5916\u8865\u5145\u3002";
          }
          action = `\u901A\u8FC7${acceptableFoods(n)}\u7B49\u591A\u6837\u98DF\u7269\u4FDD\u6301\u6765\u6E90\u3002`;
          if (n.id === "b7") {
            supplement = "\u4E0D\u628A\u751F\u7269\u7D20\u4F5C\u4E3A\u4E00\u822C\u8131\u53D1\u7684\u9ED8\u8BA4\u8865\u5145\u3002";
            caution = "\u9AD8\u5242\u91CF\u751F\u7269\u7D20\u53EF\u80FD\u5E72\u6270\u5316\u9A8C\uFF0C\u6B63\u5728\u670D\u7528\u65F6\u8BF7\u63D0\u524D\u544A\u77E5\u533B\u62A4\u3002";
          }
        }
        if (vegetarian && ["b1", "b2", "b3", "b5", "b6", "b7", "zinc", "selenium", "copper", "phosphorus", "choline"].includes(n.id)) action = "\u5728\u7B26\u5408\u4F60\u996E\u98DF\u65B9\u5F0F\u7684\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u852C\u83DC\u548C\u53EF\u8010\u53D7\u7684\u575A\u679C\u79CD\u5B50\u4E2D\u4FDD\u6301\u591A\u6837\u642D\u914D\uFF1B\u5F3A\u5316\u98DF\u54C1\u6309\u6807\u7B7E\u786E\u8BA4\u3002";
        if (direct(n.id)) {
          s = "existing";
          reason = `\u4F60\u5DF2\u7ECF\u5728\u8865\u5145${n.title}\uFF0C\u8FD9\u6B21\u4E0D\u91CD\u590D\u5EFA\u8BAE\u65B0\u589E\u3002`;
          action = "\u4FDD\u7559\u5F53\u524D\u8BB0\u5F55\uFF0C\u5148\u6838\u5BF9\u6BCF\u4EFD\u542B\u91CF\u548C\u5B9E\u9645\u4F7F\u7528\u9891\u7387\uFF1B\u5DF2\u6709\u533B\u5631\u8BF7\u7EE7\u7EED\u6309\u533B\u5631\u5B89\u6392\u3002";
          supplement = "";
          certainty = 0;
        }
        const medical = [];
        const abnormal = { vitamin_d: "d_low", iron: "iron_low", b12: "b12_low", potassium: "potassium_abnormal", calcium: "calcium_abnormal" }[n.id];
        if (abnormal && labs.includes(abnormal)) medical.push(["\u4F60\u5DF2\u6709\u8FD9\u9879\u76F8\u5173\u68C0\u67E5\u5F02\u5E38\u3002", "\u4F18\u5148\u6309\u533B\u751F\u7ED9\u51FA\u7684\u5904\u7406\u548C\u590D\u67E5\u5B89\u6392\uFF0C\u4E0D\u7528\u95EE\u5377\u66FF\u4EE3\u5DF2\u6709\u65B9\u6848\u3002"]);
        if (n.id === "potassium" && (restricted || meds.includes("potassium_affecting") || has(a.safety, "unknown") || has(a.safety, "medication") && meds.some((id) => ["other", "unknown"].includes(id)))) medical.push(["\u5065\u5EB7\u6216\u7528\u836F\u60C5\u51B5\u53EF\u80FD\u5F71\u54CD\u9002\u5408\u4F60\u7684\u94BE\u6444\u5165\u5B89\u6392\u3002", "\u5148\u6838\u5BF9\u8840\u94BE\u3001\u80BE\u529F\u80FD\u548C\u836F\u7269\uFF0C\u4E0D\u81EA\u884C\u589E\u52A0\u9AD8\u94BE\u98DF\u7269\u3001\u94BE\u7247\u6216\u542B\u94BE\u4F4E\u94A0\u76D0\u3002"]);
        if (n.id === "vitamin_k" && meds.includes("warfarin")) medical.push(["\u4F60\u6B63\u5728\u4F7F\u7528\u534E\u6CD5\u6797\u3002", "\u4FDD\u6301\u7EF4\u751F\u7D20 K \u98DF\u7269\u76F8\u5BF9\u7A33\u5B9A\uFF0C\u8C03\u6574\u996E\u98DF\u6216\u542B K \u4EA7\u54C1\u524D\u5148\u4E0E\u5F00\u836F\u533B\u751F\u786E\u8BA4\u3002"]);
        if (n.id === "iron" && a.menstrual === "heavy") medical.push(["\u4F60\u63D0\u5230\u7ECF\u91CF\u8F83\u591A\u6216\u7ECF\u671F\u8F83\u957F\u3002", "\u628A\u5931\u8840\u60C5\u51B5\u544A\u8BC9\u533B\u751F\uFF0C\u8BA8\u8BBA\u662F\u5426\u9700\u8981\u8840\u5E38\u89C4\u3001\u94C1\u86CB\u767D\u7B49\u8BC4\u4F30\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u8865\u94C1\u3002"]);
        if (n.id === "b12" && meds.includes("b12_affecting")) medical.push(["\u4F60\u63D0\u5230\u4E8C\u7532\u53CC\u80CD\u6216\u957F\u671F\u6291\u9178\u836F\u3002", "\u5411\u5F00\u836F\u533B\u751F\u8BE2\u95EE\u662F\u5426\u9700\u8981\u8BC4\u4F30 B12\uFF0C\u4E0D\u81EA\u884C\u505C\u836F\u3002"]);
        if (n.id === "iodine" && conditions.includes("thyroid")) medical.push(["\u4F60\u63D0\u5230\u7532\u72B6\u817A\u76F8\u5173\u75BE\u75C5\u3002", "\u6309\u5177\u4F53\u75C5\u60C5\u786E\u8BA4\u7898\u6444\u5165\u8981\u6C42\uFF0C\u4E0D\u81EA\u884C\u66F4\u6362\u76D0\u6216\u589E\u52A0\u6D77\u85FB\u548C\u7898\u8865\u5145\u5242\u3002"]);
        if (n.id === "vitamin_a" && meds.includes("retinoids")) medical.push(["\u4F60\u6B63\u5728\u4F7F\u7528\u7EF4 A \u9178\u7C7B\u836F\u7269\u3002", "\u4E0D\u8981\u81EA\u884C\u52A0\u7EF4\u751F\u7D20 A \u6216\u9C7C\u809D\u6CB9\uFF0C\u628A\u73B0\u6709\u4EA7\u54C1\u4EA4\u7ED9\u5F00\u836F\u533B\u751F\u6838\u5BF9\u3002"]);
        if (n.id === "calcium" && conditions.includes("stones")) medical.push(["\u4F60\u63D0\u5230\u7ED3\u77F3\u6216\u9AD8\u9499\u8840\u75C7\u3002", "\u5148\u786E\u8BA4\u7ED3\u77F3\u7C7B\u578B\u6216\u9AD8\u9499\u539F\u56E0\uFF0C\u4E0D\u81EA\u884C\u589E\u52A0\u9499\u8865\u5145\uFF0C\u4E5F\u4E0D\u8981\u64C5\u81EA\u628A\u6B63\u5E38\u996E\u98DF\u4E2D\u7684\u9499\u5168\u90E8\u53BB\u6389\u3002"]);
        if (reproductive && n.id === "b9") medical.push(["\u5907\u5B55\u3001\u5B55\u671F\u548C\u54FA\u4E73\u671F\u9700\u8981\u5206\u522B\u5B89\u6392\u53F6\u9178\u7B49\u8425\u517B\u3002", "\u6838\u5BF9\u5F53\u524D\u9636\u6BB5\u548C\u5B55\u671F\u8865\u5145\u54C1\uFF0C\u4E0E\u4EA7\u79D1\u786E\u8BA4\u53F6\u9178\u53CA\u5176\u4ED6\u6210\u5206\u7684\u5B89\u6392\u3002"]);
        if (medical.length) {
          s = "check";
          reason = medical.map((x) => x[0]).join("");
          action = medical.map((x) => x[1]).join("");
          supplement = "";
          certainty = 0;
          caution = action;
        } else if (restricted) {
          if (["food", "supplement"].includes(s)) s = "check";
          action = "\u5148\u628A\u8FD9\u4E9B\u98DF\u7269\u6765\u6E90\u4E0E\u73B0\u6709\u996E\u98DF\u533B\u5631\u6838\u5BF9\uFF0C\u786E\u8BA4\u80FD\u8C03\u6574\u7684\u79CD\u7C7B\u4E0E\u4EFD\u91CF\u3002";
          supplement = "";
          caution = "\u5DF2\u6709\u996E\u98DF\u9650\u5236\u8BF7\u7EE7\u7EED\u9075\u5FAA\uFF0C\u4E0D\u81EA\u884C\u589E\u51CF\u53D7\u9650\u98DF\u7269\u3002";
        } else if (child) {
          s = s === "existing" ? "existing" : "check";
          reason = "\u513F\u7AE5\u9700\u8981\u6309\u5177\u4F53\u5E74\u9F84\u3001\u751F\u957F\u548C\u5976 / \u6B63\u9910\u60C5\u51B5\u5355\u72EC\u6838\u5BF9\u3002";
          action = "\u7531\u76D1\u62A4\u4EBA\u6574\u7406\u5B9E\u9645\u8FDB\u98DF\uFF0C\u4E0E\u513F\u79D1\u6216\u8425\u517B\u4E13\u4E1A\u4EBA\u5458\u786E\u8BA4\u9002\u9F84\u98DF\u7269\u548C\u8865\u5145\u5B89\u6392\u3002";
          supplement = "";
          certainty = 0;
        } else if (s === "supplement" && (cannotAutoSupplement || knownUnknownProduct)) {
          s = "check";
          caution = knownUnknownProduct ? "\u4F60\u8FD8\u5728\u4F7F\u7528\u6210\u5206\u672A\u6838\u5BF9\u7684\u590D\u5408\u6216\u5176\u4ED6\u4EA7\u54C1\uFF0C\u65B0\u589E\u524D\u5148\u770B\u6E05\u662F\u5426\u5305\u542B\u8FD9\u4E00\u9879\u3002" : "\u7ED3\u5408\u5F53\u524D\u9636\u6BB5\u3001\u5065\u5EB7\u6216\u7528\u836F\u60C5\u51B5\uFF0C\u8BF7\u5148\u786E\u8BA4\u8865\u5145\u65B9\u5F0F\u3002";
          supplement = "";
        }
        if (s === "maintain") action = "\u7EE7\u7EED\u4FDD\u7559\u8FD9\u4E9B\u7A33\u5B9A\u7684\u98DF\u7269\u6765\u6E90\u3002\u8FD9\u91CC\u786E\u8BA4\u7684\u662F\u6709\u6765\u6E90\uFF0C\u5168\u5929\u4EFD\u91CF\u662F\u5426\u5408\u9002\u8FD8\u8981\u7ED3\u5408\u5176\u4ED6\u9910\u98DF\u3002";
        if (s === "check" && !medical.length && !restricted && !child) action = n.id === "calcium" ? "\u5148\u786E\u8BA4\u996E\u54C1\u6216\u66FF\u4EE3\u98DF\u7269\u7684\u6807\u7B7E\u542B\u91CF\u548C\u4EFD\u91CF\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u589E\u52A0\u9499\u3002" : n.id === "vitamin_d" ? "\u5148\u6838\u5BF9\u5F3A\u5316\u98DF\u54C1\u4E0E\u5DF2\u6709\u4EA7\u54C1\u662F\u5426\u542B\u7EF4\u751F\u7D20 D\uFF0C\u4EE5\u53CA\u5B9E\u9645\u98DF\u7528\u9891\u7387\u3002" : n.id === "b12" ? "\u5148\u786E\u8BA4\u52A8\u7269\u6027\u98DF\u7269\u6216 B12 \u5F3A\u5316\u98DF\u54C1\u662F\u5426\u7A33\u5B9A\uFF0C\u4EE5\u53CA\u73B0\u6709\u4EA7\u54C1\u7684\u6210\u5206\u3002" : action;
        if (["food", "supplement"].includes(s) && excluded.some((id) => ["unknown", "other"].includes(id))) caution += " \u98DF\u7269\u8FC7\u654F\u8303\u56F4\u8FD8\u672A\u5B8C\u5168\u786E\u8BA4\uFF0C\u53EA\u9009\u62E9\u81EA\u5DF1\u660E\u786E\u80FD\u5403\u7684\u98DF\u7269\u3002";
        if (s === "food" && ["b2", "b6", "zinc"].includes(n.id) && excluded.length && !excluded.includes("none")) action = "\u4ECE\u4F60\u660E\u786E\u80FD\u5403\u7684\u98DF\u7269\u4E2D\u5B89\u6392\u591A\u6837\u6765\u6E90\uFF1B\u5177\u4F53\u53EF\u53C2\u8003\u5C55\u5F00\u540E\u7684\u98DF\u7269\u6E05\u5355\uFF0C\u5E76\u907F\u5F00\u5DF2\u77E5\u8FC7\u654F\u98DF\u7269\u3002";
        const details = [d("\u5B83\u4E3B\u8981\u505A\u4EC0\u4E48", n.mechanism), d("\u54EA\u4E9B\u98DF\u7269\u80FD\u63D0\u4F9B", n.sources), d("\u8FD9\u6B21\u5224\u65AD\u7684\u8303\u56F4", "\u8FD9\u91CC\u786E\u8BA4\u7684\u662F\u98DF\u7269\u6765\u6E90\u662F\u5426\u503C\u5F97\u6539\u5584\uFF0C\u4E0D\u662F\u4F53\u5185\u7F3A\u4E4F\u8BCA\u65AD\uFF0C\u4E5F\u6CA1\u6709\u628A\u9891\u7387\u6362\u7B97\u6210\u7CBE\u786E\u6BEB\u514B\u7F3A\u53E3\u3002")];
        if (n.id === "calcium" && a.calcium_label) {
          const x = a.calcium_label, ml = Number(x.ml), mg = Number(x.mg);
          if (ml > 0 && mg > 0) details.unshift(d("\u4F60\u586B\u5199\u7684\u996E\u54C1\u8D21\u732E", `\u6309\u6807\u7B7E ${mg} mg / 100 mL\u3001\u6BCF\u5929 ${ml} mL \u8BA1\u7B97\uFF0C\u8FD9\u4E00\u79CD\u996E\u54C1\u7EA6\u63D0\u4F9B ${Math.round(ml * mg / 100)} mg \u9499\u3002\u4E0D\u542B\u5176\u4ED6\u98DF\u7269\uFF0C\u4E5F\u4E0D\u7B49\u4E8E\u5168\u5929\u5DF2\u5403\u591F\u3002`));
        }
        rows.push({ ...card(n.id, n.title, s, reason, action, supplement, details, [n.id], caution), group: n.group, certainty, essential, medical: medical.length > 0 });
      }
      const fishLow = get("fish") === "low";
      if (fishLow) {
        let s = pref.fish === "no" && pref.approach !== "food" ? "supplement" : "food";
        if (direct("omega3")) s = "existing";
        if (s === "supplement" && (cannotAutoSupplement || knownUnknownProduct)) s = "check";
        const fishExcluded = vegetarian || excluded.includes("fish");
        rows.push({ ...card(
          "omega3",
          "Omega-3 \xB7 \u9C7C\u6CB9 / \u85FB\u6CB9",
          s,
          direct("omega3") ? "\u4F60\u5DF2\u89C4\u5F8B\u4F7F\u7528\u9C7C\u6CB9\u6216\u85FB\u6CB9\uFF0C\u5148\u6838\u5BF9 EPA \u548C DHA \u542B\u91CF\u3002" : "\u4F60\u5E73\u65F6\u5BCC\u8102\u9C7C\u5403\u5F97\u5C11\uFF0CEPA \u548C DHA \u7684\u7A33\u5B9A\u6765\u6E90\u503C\u5F97\u5355\u72EC\u5B89\u6392\u3002",
          direct("omega3") ? "\u5148\u4FDD\u7559\u5F53\u524D\u8BB0\u5F55\uFF0C\u6838\u5BF9\u6807\u7B7E\u4E0E\u5B9E\u9645\u4F7F\u7528\u9891\u7387\uFF0C\u8FD9\u6B21\u4E0D\u91CD\u590D\u65B0\u589E\u3002" : restricted ? "\u5148\u6309\u73B0\u6709\u996E\u98DF\u8981\u6C42\u6838\u5BF9\u53EF\u7528\u7684\u6765\u6E90\u3002" : fishExcluded ? "\u5982\u679C\u957F\u671F\u4E0D\u5403\u9C7C\uFF0C\u53EF\u4EE5\u4E86\u89E3\u85FB\u6CB9\u6765\u6E90\uFF0C\u5E76\u6838\u5BF9\u5177\u4F53 EPA / DHA \u542B\u91CF\u3002" : "\u613F\u610F\u5403\u9C7C\u65F6\uFF0C\u5148\u628A\u4E09\u6587\u9C7C\u3001\u6C99\u4E01\u9C7C\u7B49\u5B89\u6392\u8FDB\u6BCF\u5468\u9910\u5355\u3002",
          direct("omega3") ? "" : "\u957F\u671F\u4E0D\u5403\u9C7C\u65F6\uFF0C\u518D\u8003\u8651\u9C7C\u6CB9\u6216\u85FB\u6CB9\uFF1B\u770B EPA + DHA\uFF0C\u4E0D\u53EA\u770B\u201C\u9C7C\u6CB9\u603B\u91CD\u91CF\u201D\u3002",
          [d("\u4E3A\u4EC0\u4E48\u9002\u5408\u5173\u6CE8", "EPA \u548C DHA \u662F\u7EC6\u80DE\u819C\u6210\u5206\u3002\u8FD9\u9879\u6765\u81EA\u9C7C\u7C7B\u6765\u6E90\u7EBF\u7D22\uFF0C\u4E0D\u662F\u8840\u8102\u6CBB\u7597\u6216\u7F3A\u4E4F\u8BCA\u65AD\u3002"), d("\u600E\u4E48\u9009\u6765\u6E90", "\u6838\u6843\u548C\u4E9A\u9EBB\u7C7D\u4E3B\u8981\u63D0\u4F9B ALA\uFF0C\u4E0D\u80FD\u6309\u540C\u7B49\u91CD\u91CF\u6362\u7B97\u6210 EPA / DHA\u3002\u9C7C\u6CB9\u6765\u6E90\u9700\u7559\u610F\u9C7C\u7C7B\u8FC7\u654F\uFF1B\u85FB\u6CB9\u914D\u65B9\u4E5F\u8981\u770B\u5177\u4F53\u542B\u91CF\u3002")],
          ["omega3"],
          meds.some((id) => id !== "none") ? "\u6B63\u5728\u7528\u836F\u65F6\uFF0C\u65B0\u589E\u9C7C\u6CB9\u6216\u85FB\u6CB9\u524D\u8BF7\u8BA9\u533B\u751F\u6216\u836F\u5E08\u6838\u5BF9\u3002" : ""
        ), group: "other", certainty: 2 });
      } else {
        const s = direct("omega3") ? "existing" : get("fish") === "source" ? "maintain" : "check";
        rows.push({ ...card("omega3", "Omega-3 \xB7 \u9C7C\u6CB9 / \u85FB\u6CB9", s, s === "existing" ? "\u4F60\u5DF2\u5728\u89C4\u5F8B\u4F7F\u7528\u9C7C\u6CB9\u6216\u85FB\u6CB9\u3002" : s === "maintain" ? "\u4F60\u6709\u8F83\u89C4\u5F8B\u7684\u5BCC\u8102\u9C7C\u6765\u6E90\u3002" : "\u9C7C\u79CD\u3001\u9891\u7387\u6216\u4EFD\u91CF\u8FD8\u9700\u8981\u8FDB\u4E00\u6B65\u786E\u8BA4\u3002", s === "maintain" ? "\u4FDD\u7559\u6BCF\u5468\u5403\u9C7C\u7684\u4E60\u60EF\uFF0C\u4E0D\u56E0\u9009\u62E9\u591A\u4E2A\u76EE\u6807\u5C31\u989D\u5916\u589E\u52A0\u9C7C\u6CB9\u3002" : "\u5148\u770B\u6E05\u9C7C\u7C7B\u6765\u6E90\uFF0C\u6216\u5DF2\u6709\u4EA7\u54C1\u7684 EPA \u4E0E DHA \u542B\u91CF\u3002", "", [], ["omega3"]), group: "other", certainty: 0 });
      }
      const plantLow = detailed ? allLow(["vegetables", "fruit", "whole_grains", "beans"]) : allLow(["vegetables", "fruit"]);
      if (plantLow && !restricted && !child) rows.push({ ...card("fiber", "\u81B3\u98DF\u7EA4\u7EF4", "food", "\u4F60\u5E38\u5403\u7684\u852C\u679C\u548C\u90E8\u5206\u690D\u7269\u6027\u98DF\u7269\u504F\u5C11\u3002", "\u4ECE\u4E00\u4EFD\u71D5\u9EA6\u3001\u6742\u8C46\u6216\u852C\u83DC\u5F00\u59CB\uFF0C\u9010\u6B65\u589E\u52A0\uFF0C\u5E76\u6309\u81EA\u5DF1\u7684\u996E\u6C34\u9650\u5236\u548C\u8010\u53D7\u60C5\u51B5\u8C03\u6574\u3002", "\u5148\u770B\u996E\u98DF\u6539\u5584\uFF1B\u4E0D\u628A\u6240\u6709\u6D88\u5316\u95EE\u9898\u90FD\u4EA4\u7ED9\u76CA\u751F\u83CC\u3002"), group: "other", certainty: 2 });
      else rows.push({ ...card("fiber", "\u81B3\u98DF\u7EA4\u7EF4", restricted ? "check" : anySource(["vegetables", "fruit", "whole_grains", "beans"]) ? "maintain" : "check", "\u7ED3\u5408\u852C\u679C\u3001\u5168\u8C37\u548C\u8C46\u7C7B\u7684\u79CD\u7C7B\u4E0E\u4EFD\u91CF\u6765\u770B\u3002", restricted ? "\u6309\u73B0\u6709\u996E\u98DF\u533B\u5631\u786E\u8BA4\u53EF\u4EE5\u8C03\u6574\u7684\u98DF\u7269\u3002" : "\u4FDD\u7559\u80FD\u8010\u53D7\u7684\u591A\u6837\u690D\u7269\u6027\u98DF\u7269\uFF0C\u4EFD\u91CF\u4E0D\u6E05\u695A\u65F6\u518D\u8865\u5145\u8BB0\u5F55\u3002"), group: "other", certainty: 0 });
      rows.push({ ...card("protein", "\u86CB\u767D\u8D28", direct("protein") ? "existing" : "check", direct("protein") ? "\u4F60\u5DF2\u6709\u86CB\u767D\u7C89\u8865\u5145\u6765\u6E90\u3002" : "\u86CB\u767D\u8D28\u9700\u8981\u7ED3\u5408\u5168\u5929\u98DF\u7269\u3001\u8BAD\u7EC3\u548C\u5B9E\u9645\u4EFD\u91CF\u4E00\u8D77\u770B\u3002", restricted ? "\u6309\u73B0\u6709\u533B\u5631\u786E\u8BA4\u86CB\u767D\u8D28\u6444\u5165\u5B89\u6392\u3002" : `\u5148\u8BB0\u5F55\u6B63\u9910\u4E2D\u7684${acceptableFoods({ id: "protein" })}\uFF0C\u7C89\u5242\u4E3B\u8981\u63D0\u4F9B\u4FBF\u5229\u3002`, "", [d("\u600E\u6837\u66F4\u51C6\u786E\u5730\u5224\u65AD", "\u8EAB\u9AD8\u548C\u4F53\u91CD\u4E0D\u80FD\u5355\u72EC\u51B3\u5B9A\u8FD8\u9700\u8981\u591A\u5C11\u86CB\u767D\u7C89\u3002\u81F3\u5C11\u9700\u8981\u5168\u5929\u86CB\u767D\u98DF\u7269\u4E0E\u4EFD\u91CF\uFF0C\u4E0D\u80FD\u628A\u4F53\u91CD\u76F4\u63A5\u6362\u6210\u8865\u5145\u7F3A\u53E3\u3002")], ["sport"]), group: "other", certainty: 0 });
      const confirmedTraining = training.frequency && training.frequency !== "zero" && training.stable === "stable";
      if (confirmedTraining && list(training.types).some((id) => ["strength", "hiit"].includes(id)) && goals.includes("strength") && !cannotAutoSupplement) {
        if (!direct("creatine") && !knownUnknownProduct) optional.push(card("creatine", "\u808C\u9178\u4E00\u6C34\u5408\u7269", "optional", `\u4F60\u6709${{ one_two: "\u6BCF\u5468 1\u20132 \u6B21", three_four: "\u6BCF\u5468 3\u20134 \u6B21", five_plus: "\u6BCF\u5468 5 \u6B21\u53CA\u4EE5\u4E0A" }[training.frequency]}\u7684\u7A33\u5B9A\u8BAD\u7EC3\uFF0C\u5E76\u5E0C\u671B\u63D0\u5347\u529B\u91CF\u6216\u589E\u808C\u3002`, "\u5728\u8BAD\u7EC3\u3001\u6B63\u9910\u548C\u6062\u590D\u7A33\u5B9A\u7684\u57FA\u7840\u4E0A\uFF0C\u53EF\u4EE5\u628A\u808C\u9178\u4F5C\u4E3A\u53EF\u9009\u9879\u3002", "\u8FD9\u662F\u8BAD\u7EC3\u8868\u73B0\u9009\u9879\uFF0C\u4E0D\u662F\u201C\u7F3A\u808C\u9178\u201D\u3002", [d("\u5B83\u4E3B\u8981\u505A\u4EC0\u4E48", "\u5E2E\u52A9\u808C\u8089\u5728\u53CD\u590D\u77ED\u65F6\u9AD8\u5F3A\u5EA6\u6D3B\u52A8\u4E2D\u5FEB\u901F\u8865\u5145\u80FD\u91CF\uFF1B\u7814\u7A76\u8F83\u5145\u5206\u7684\u5F62\u5F0F\u662F\u4E00\u6C34\u5408\u7269\u3002"), d("\u4F7F\u7528\u524D\u4E86\u89E3", "\u90E8\u5206\u4EBA\u4F1A\u51FA\u73B0\u4F53\u5185\u6C34\u5206\u589E\u52A0\u6216\u80C3\u80A0\u4E0D\u9002\u3002\u80BE\u75C5\u3001\u5B55\u54FA\u671F\u3001\u672A\u6210\u5E74\u4EBA\u548C\u7528\u836F\u60C5\u51B5\u9700\u5355\u72EC\u786E\u8BA4\uFF0C\u4E0D\u5957\u7528\u6210\u4EBA\u7814\u7A76\u65B9\u6848\u3002")], ["sport"], meds.some((id) => id !== "none") ? "\u4F60\u6B63\u5728\u7528\u836F\uFF0C\u5F00\u59CB\u8865\u5145\u524D\u8BF7\u6838\u5BF9\u9002\u7528\u6027\u3002" : ""));
      }
      if (training.frequency && training.frequency !== "zero" && ["sometimes_hard", "usually_hard"].includes(training.protein_access) && !restricted && !child) {
        optional.push(card("protein", "\u86CB\u767D\u8D28 \xB7 \u98DF\u7269\u6216\u86CB\u767D\u7C89", "optional", "\u4F60\u63D0\u5230\u8BAD\u7EC3\u65E5\u6709\u65F6\u96BE\u4EE5\u7A33\u5B9A\u5403\u5230\u6B63\u9910\u86CB\u767D\u3002", `\u5148\u628A${acceptableFoods({ id: "protein" })}\u5206\u914D\u5230\u6B63\u9910\u3002`, "\u5403\u996D\u4E0D\u65B9\u4FBF\u65F6\uFF0C\u86CB\u767D\u7C89\u53EF\u4EE5\u8865\u4E0A\u4FBF\u5229\u6027\uFF1B\u4E0D\u662F\u56E0\u4E3A\u5065\u8EAB\u5C31\u5FC5\u987B\u559D\u3002", [d("\u4E3A\u4EC0\u4E48\u4E0D\u76F4\u63A5\u7B97\u51E0\u52FA", "\u4F53\u91CD\u672C\u8EAB\u4E0D\u8DB3\u4EE5\u7B97\u51FA\u7F3A\u53E3\uFF0C\u8FD8\u8981\u77E5\u9053\u5168\u5929\u98DF\u7269\u3001\u603B\u80FD\u91CF\u548C\u73B0\u6709\u7C89\u5242\u3002\u5148\u8BB0\u5F55\u5B9E\u9645\u4EFD\u91CF\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u9700\u8981\u989D\u5916\u8865\u5145\u3002")], ["sport"]));
      }
      if (training.sweat === "yes" && !restricted && !child) optional.push(card("hydration", "\u957F\u65F6\u51FA\u6C57\u7684\u8865\u6C34\u4E0E\u7535\u89E3\u8D28", "optional", "\u4F60\u63D0\u5230\u8FDE\u7EED\u660E\u663E\u51FA\u6C57\u8D85\u8FC7 2 \u5C0F\u65F6\uFF0C\u4E5F\u4E0D\u65B9\u4FBF\u6B63\u5E38\u8FDB\u9910\u3002", "\u63D0\u524D\u5B89\u6392\u996E\u6C34\u3001\u8FDB\u98DF\u548C\u4FBF\u643A\u8865\u7ED9\uFF0C\u7559\u610F\u6C14\u6E29\u4E0E\u51FA\u6C57\u60C5\u51B5\u3002", "\u8FD9\u79CD\u573A\u666F\u53EF\u4EE5\u8003\u8651\u542B\u7535\u89E3\u8D28\u996E\u54C1\uFF1B\u65E5\u5E38\u77ED\u65F6\u6D3B\u52A8\u4EE5\u6C34\u548C\u6B63\u5E38\u996E\u98DF\u4E3A\u4E3B\u3002", [d("\u8865\u6C34\u6CE8\u610F", "\u4E0D\u5F3A\u8FEB\u81EA\u5DF1\u5927\u91CF\u996E\u6C34\uFF0C\u4E5F\u4E0D\u81EA\u884C\u53E0\u52A0\u76D0\u7247\uFF1B\u5FC3\u80BE\u75BE\u75C5\u3001\u9650\u76D0\u9650\u6DB2\u6216\u7528\u836F\u60C5\u51B5\u9700\u8981\u4E2A\u522B\u5B89\u6392\u3002")], ["sport"]));
      const sleep = list(a.sleep_detail), sleepContext = a.sleep_context || {};
      if (goals.some((id) => ["sleep", "stress", "fatigue", "brain"].includes(id))) {
        const actions = [];
        if (sleepContext.hours === "short") actions.push("\u4F60\u901A\u5E38\u6BCF\u665A\u7761\u4E0D\u5230 6 \u5C0F\u65F6\uFF0C\u5148\u7559\u51FA\u66F4\u5145\u5206\u7684\u7761\u7720\u673A\u4F1A\u3002");
        if (sleep.includes("sleep_short_opportunity")) actions.push("\u5148\u4E3A\u7761\u7720\u7559\u51FA\u7A33\u5B9A\u7684\u65F6\u95F4\uFF1B\u591C\u95F4\u7167\u62A4\u80FD\u5206\u62C5\u7684\u90E8\u5206\u63D0\u524D\u5B89\u6392\u3002");
        if (sleep.includes("sleep_hard_to_start")) actions.push("\u628A\u5496\u5561\u3001\u6D53\u8336\u5B89\u6392\u5F97\u66F4\u65E9\uFF0C\u7761\u524D\u7559\u4E00\u6BB5\u5B89\u9759\u7684\u653E\u677E\u65F6\u95F4\u3002");
        if (sleep.includes("sleep_waking") || sleep.includes("sleep_early_waking")) actions.push("\u8BB0\u5F55\u591C\u9192\u6216\u65E9\u9192\u7684\u65F6\u95F4\uFF0C\u4EE5\u53CA\u996E\u9152\u3001\u7167\u62A4\u548C\u5367\u5BA4\u73AF\u5883\u7684\u5F71\u54CD\u3002");
        if (!actions.length) actions.push("\u8FDE\u7EED\u8BB0\u5F55\u51E0\u5929\u7761\u7720\u3001\u6B63\u9910\u548C\u72B6\u6001\u53D8\u5316\uFF0C\u4ECE\u6700\u5E38\u88AB\u6253\u65AD\u7684\u4E00\u9879\u5F00\u59CB\u8C03\u6574\u3002");
        topics.push(card(
          "sleep_energy",
          "\u7761\u7720\u4E0E\u767D\u5929\u72B6\u6001",
          "food",
          sleep.length && !sleep.includes("none") ? "\u4F60\u5177\u4F53\u63D0\u5230\u4E86\u7761\u7720\u56F0\u6270\uFF0C\u5148\u5904\u7406\u4E0E\u4F60\u7684\u4F5C\u606F\u76F8\u7B26\u7684\u5F71\u54CD\u56E0\u7D20\u3002" : "\u4F60\u5E0C\u671B\u6539\u5584\u7CBE\u529B\u6216\u4E13\u6CE8\uFF0C\u5148\u4ECE\u7761\u7720\u673A\u4F1A\u548C\u89C4\u5F8B\u8FDB\u9910\u627E\u7EBF\u7D22\u3002",
          actions.join(""),
          "",
          [d("\u9541\u5E94\u8BE5\u653E\u5728\u54EA\u91CC\u770B", "\u5982\u679C\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u575A\u679C\u6216\u7EFF\u53F6\u83DC\u6765\u6E90\u5C11\uFF0C\u524D\u9762\u7684\u9541\u5EFA\u8BAE\u4F1A\u63D0\u793A\u6539\u5584\u996E\u98DF\u3002\u6765\u6E90\u7A33\u5B9A\u65F6\uFF0C\u4E0D\u56E0\u4E3A\u7761\u4E0D\u597D\u5C31\u989D\u5916\u589E\u52A0\u7518\u6C28\u9178\u9541\u6216\u82CF\u7CD6\u9178\u9541\u3002"), d("\u808C\u9178\u4E0E\u4E13\u6CE8", "\u808C\u9178\u5728\u8FD9\u91CC\u6309\u660E\u786E\u7684\u529B\u91CF\u8BAD\u7EC3\u573A\u666F\u8003\u8651\uFF0C\u4E0D\u628A\u4E00\u822C\u8111\u96FE\u8F6C\u6210\u8865\u8111\u914D\u65B9\u3002")],
          ["sleep"]
        ));
        if (a.impact === "persistent_impairing" || has(sleepContext.interference, "snoring") || sleepContext.frequency === "often" && sleepContext.duration === "long") addCheck("sleep_followup", "\u6301\u7EED\u56F0\u5026\u6216\u7761\u7720\u56F0\u6270", "\u4F60\u63D0\u5230\u56F0\u6270\u957F\u671F\u9891\u7E41\u51FA\u73B0\u3001\u660E\u663E\u5F71\u54CD\u751F\u6D3B\uFF0C\u6216\u6709\u6253\u9F3E\u3001\u618B\u9192\u7B49\u60C5\u51B5\u3002", "\u8BF7\u5B89\u6392\u533B\u7597\u8BC4\u4F30\uFF1B\u56F0\u5230\u5F71\u54CD\u9A7E\u9A76\u65F6\uFF0C\u5148\u6682\u505C\u9A7E\u9A76\u7B49\u5371\u9669\u6D3B\u52A8\u3002", ["sleep"]);
      }
      if (goals.includes("skin") || goals.includes("hair")) topics.push(card("appearance", "\u76AE\u80A4\u3001\u5934\u53D1\u4E0E\u6307\u7532", "optional", "\u4F60\u5173\u6CE8\u5916\u89C2\u72B6\u6001\uFF0C\u996E\u98DF\u548C\u65E5\u5E38\u62A4\u7406\u662F\u8FD9\u6B21\u7684\u57FA\u7840\u3002", "\u4FDD\u6301\u6B63\u5E38\u8FDB\u98DF\u3001\u86CB\u767D\u8D28\u6765\u6E90\u3001\u9632\u6652\u548C\u4FDD\u6E7F\uFF1B\u6301\u7EED\u6216\u7A81\u7136\u8131\u53D1\u3001\u660E\u663E\u76AE\u75B9\u5148\u786E\u8BA4\u539F\u56E0\u3002", "\u80F6\u539F\u86CB\u767D\u53EF\u4F5C\u4E3A\u5065\u5EB7\u6210\u4EBA\u5916\u89C2\u76EE\u6807\u7684\u81EA\u9009\u4E86\u89E3\u9879\uFF0C\u4E0D\u662F\u5FC5\u9700\u8425\u517B\u7F3A\u53E3\u3002", [d("\u80F6\u539F\u86CB\u767D", "\u7814\u7A76\u5BF9\u76AE\u80A4\u6C34\u5206\u6216\u5F39\u6027\u7684\u7ED3\u679C\u5E76\u4E0D\u4E00\u81F4\uFF0C\u6548\u679C\u53D7\u7814\u7A76\u8D28\u91CF\u7B49\u5F71\u54CD\uFF0C\u4E0D\u80FD\u4FDD\u8BC1\u660E\u663E\u6539\u5584\u3002"), d("\u751F\u7269\u7D20", "\u4E00\u822C\u8131\u53D1\u4E0D\u9ED8\u8BA4\u8865\u751F\u7269\u7D20\uFF1B\u9AD8\u5242\u91CF\u53EF\u80FD\u5E72\u6270\u90E8\u5206\u5316\u9A8C\u3002")], ["collagen", "b7"]));
      if (goals.includes("eyes")) topics.push(card("eyes", "\u7528\u773C\u4E0E\u773C\u90E8\u8212\u9002", "food", "\u4F60\u5173\u6CE8\u773C\u775B\u72B6\u6001\uFF0C\u5148\u770B\u8FDE\u7EED\u7528\u773C\u548C\u4F11\u606F\u5B89\u6392\u3002", "\u5B89\u6392\u8FD1\u8DDD\u79BB\u7528\u773C\u95F4\u6B47\uFF0C\u4FDD\u6301\u7167\u660E\uFF0C\u65E5\u5E38\u8F6E\u6362\u6DF1\u7EFF\u53F6\u83DC\u3002\u89C6\u7269\u4E0D\u6E05\u6216\u6301\u7EED\u4E0D\u9002\u8BF7\u68C0\u67E5\u773C\u775B\u3002", "\u53F6\u9EC4\u7D20\u4E0D\u662F\u957F\u65F6\u95F4\u770B\u5C4F\u5E55\u6216\u513F\u7AE5\u8FD1\u89C6\u7684\u5FC5\u9009\u8865\u5242\u3002", [d("\u53F6\u9EC4\u7D20\u9002\u5408\u8C01", "\u53F6\u9EC4\u7D20\u53EF\u4EE5\u6765\u81EA\u98DF\u7269\u3002AREDS2 \u914D\u65B9\u5BF9\u5E94\u7279\u5B9A\u9636\u6BB5\u7684\u5E74\u9F84\u76F8\u5173\u9EC4\u6591\u53D8\u6027\uFF0C\u4E0D\u80FD\u5957\u7528\u4E8E\u666E\u901A\u7528\u773C\u75B2\u52B3\u3002")], ["eyes"]));
      if (goals.includes("gut")) topics.push(card("gut", "\u6D88\u5316\u4E0E\u6392\u4FBF", "food", "\u6392\u4FBF\u504F\u5E72\u3001\u8179\u80C0\u548C\u53CD\u590D\u8179\u6CFB\u7684\u6539\u5584\u65B9\u5F0F\u4E0D\u540C\u3002", (a.goal_detail || {}).gut === "diarrhea" ? "\u53CD\u590D\u8179\u6CFB\u5E94\u5148\u786E\u8BA4\u539F\u56E0\uFF0C\u8BB0\u5F55\u98DF\u7269\u548C\u53D1\u4F5C\u65F6\u95F4\uFF0C\u5FC5\u8981\u65F6\u5C31\u533B\u3002" : "\u9010\u6B65\u8C03\u6574\u80FD\u8010\u53D7\u7684\u852C\u679C\u3001\u5168\u8C37\u548C\u8C46\u7C7B\uFF0C\u8BB0\u5F55\u6392\u4FBF\u4E0E\u98DF\u7269\u7684\u5173\u7CFB\u3002", "\u76CA\u751F\u83CC\u8981\u5BF9\u5E94\u5177\u4F53\u7528\u9014\u548C\u83CC\u682A\uFF0C\u4E0D\u6309\u201C\u80A0\u80C3\u4E0D\u597D\u201D\u7EDF\u4E00\u5B89\u6392\u3002", [d("\u9009\u62E9\u524D\u4E86\u89E3", "\u4E0D\u540C\u83CC\u682A\u4E0D\u80FD\u4E92\u76F8\u66FF\u4EE3\uFF1B\u514D\u75AB\u529F\u80FD\u4E25\u91CD\u53D7\u635F\u7B49\u4EBA\u7FA4\u4F7F\u7528\u524D\u9700\u8981\u4E13\u4E1A\u786E\u8BA4\u3002")], ["probiotics"]));
      if (profile.weight_change === "unintentional" || (a.goal_detail || {}).gut === "alarm" || (a.child_detail || {}).growth === "concern") addCheck("health_followup", "\u5148\u4E86\u89E3\u8FD1\u671F\u8EAB\u4F53\u53D8\u5316", "\u4F60\u63D0\u5230\u975E\u4E3B\u52A8\u4F53\u91CD\u4E0B\u964D\u3001\u751F\u957F\u53D8\u5316\u6216\u6D88\u5316\u65B9\u9762\u7684\u8B66\u793A\u60C5\u51B5\u3002", "\u8BF7\u53CA\u65F6\u5C31\u533B\u786E\u8BA4\u539F\u56E0\uFF0C\u4E0D\u7528\u8865\u5145\u5242\u66FF\u4EE3\u68C0\u67E5\u3002");
      if ((a.goal_detail || {}).skin === "sudden") addCheck("skin_followup", "\u7A81\u7136\u8131\u53D1\u6216\u660E\u663E\u76AE\u75B9", "\u4F60\u63D0\u5230\u7A81\u7136\u6216\u660E\u663E\u7684\u76AE\u80A4\u3001\u5934\u53D1\u53D8\u5316\u3002", "\u5B89\u6392\u76AE\u80A4\u79D1\u8BC4\u4F30\uFF0C\u5148\u786E\u8BA4\u539F\u56E0\uFF0C\u518D\u8BA8\u8BBA\u8425\u517B\u8C03\u6574\u3002");
      if (knownUnknownProduct) addCheck("existing_label", "\u770B\u770B\u6B63\u5728\u5403\u7684\u4EA7\u54C1\u6807\u7B7E", "\u4F60\u5728\u4F7F\u7528\u590D\u5408\u6216\u5176\u4ED6\u6210\u5206\u672A\u5B8C\u5168\u6838\u5BF9\u7684\u4EA7\u54C1\u3002", "\u5148\u786E\u8BA4\u6807\u7B7E\u91CC\u7684\u6210\u5206\u548C\u5B9E\u9645\u7528\u91CF\u3002\u5176\u4ED6\u98DF\u7269\u6765\u6E90\u4ECD\u4F1A\u5206\u522B\u8BC4\u4F30\uFF0C\u4E0D\u4F1A\u628A\u6240\u6709\u8425\u517B\u90FD\u7B97\u4F5C\u5DF2\u7ECF\u8865\u8DB3\u3002");
      const goalMap = { calcium: ["bone"], vitamin_d: ["bone"], magnesium: ["diet_coverage"], potassium: ["diet_coverage"], b12: ["diet_coverage"], iron: ["diet_coverage"], omega3: ["diet_coverage"], fiber: ["gut"] };
      const ordered = rows.filter((r) => ["food", "supplement"].includes(r.state)).sort((x, y) => Number(Boolean(y.essential)) - Number(Boolean(x.essential)) || y.certainty - x.certainty || Number((goalMap[y.id] || []).includes(a.goal_priority)) - Number((goalMap[x.id] || []).includes(a.goal_priority)) || Number(y.state === "supplement") - Number(x.state === "supplement") || x.title.localeCompare(y.title, "zh"));
      if ((a.diet_habits || {}).duration === "recent") ordered.forEach((r) => {
        r.reason += "\u8FD9\u662F\u6700\u8FD1\u7684\u5403\u6CD5\uFF0C\u5148\u89C2\u5BDF\u662F\u5426\u80FD\u6062\u590D\u7A33\u5B9A\u6765\u6E90\u3002";
      });
      const cards = ordered.map((r, i) => ({ ...r, rank: i + 1 }));
      const relevantChecks = rows.filter((r) => r.medical || r.state === "check" && ["calcium", "vitamin_d", "b12"].includes(r.id));
      checks.push(...relevantChecks);
      const coverage = [["vitamins", "\u7EF4\u751F\u7D20"], ["minerals", "\u77FF\u7269\u8D28"], ["other", "\u5176\u4ED6\u8425\u517B\u4E0E\u8865\u5145\u65B9\u5411"]].map(([id, title]) => ({ id, title, items: rows.filter((r) => r.group === id).map((r) => ({ ...r, status: r.tag })) }));
      if (detailed) coverage[1].items.push({ id: "sodium_chloride", title: "\u94A0\u4E0E\u6C2F", status: "\u7ED3\u5408\u76D0\u548C\u51FA\u6C57\u573A\u666F", reason: "\u65E5\u5E38\u98DF\u76D0\u53EF\u63D0\u4F9B\u94A0\u4E0E\u6C2F\uFF0C\u4E0D\u628A\u5C11\u5403\u76D0\u76F4\u63A5\u5F53\u6210\u7F3A\u4E4F\u3002", action: restricted ? "\u6309\u73B0\u6709\u7684\u9650\u76D0\u3001\u9650\u6DB2\u8981\u6C42\u5B89\u6392\u3002" : "\u65E5\u5E38\u4E0D\u5E38\u89C4\u52A0\u76D0\u7247\uFF1B\u957F\u65F6\u51FA\u6C57\u65F6\u5355\u72EC\u770B\u8865\u6DB2\u6761\u4EF6\u3002" });
      return {
        version: "persona-inspired-v5",
        title: "\u4F60\u73B0\u5728\u4F18\u5148\u5173\u6CE8",
        summary: cards.length ? "\u5148\u770B\u8FD9\u51E0\u9879\uFF1A\u4E3A\u4EC0\u4E48\u503C\u5F97\u5173\u6CE8\uFF0C\u4EE5\u53CA\u4ECE\u98DF\u7269\u8FD8\u662F\u8865\u5145\u5242\u5F00\u59CB\u3002" : "\u5148\u786E\u8BA4\u4E0B\u9762\u7684\u5173\u952E\u4FE1\u606F\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u65B0\u589E\u8865\u5145\u5242\u3002",
        cards,
        optional,
        checks,
        topics,
        coverage,
        coverageCount: coverage.reduce((n, g) => n + g.items.length, 0),
        coverageExpanded: false,
        remainingCount: Math.max(0, cards.length - 3),
        showMore: false,
        topicsExpanded: false,
        highlights: cards.slice(0, 3).map((r) => ({ id: r.id, title: r.title, tag: r.tag, rank: r.rank, reason: r.reason })),
        emptyTitle: cards.length ? "" : "\u76EE\u524D\u5148\u4E0D\u65B0\u589E\u4E00\u6574\u5957\u8865\u5145\u5242",
        emptyAction: checks.length ? "\u5148\u5B8C\u6210\u201C\u9700\u8981\u5148\u786E\u8BA4\u201D\u91CC\u7684\u5173\u952E\u6838\u5BF9\uFF1B\u5176\u4ED6\u5DF2\u7ECF\u7A33\u5B9A\u7684\u98DF\u7269\u6765\u6E90\u7EE7\u7EED\u4FDD\u6301\u3002" : "\u4F60\u586B\u5199\u7684\u4E3B\u8981\u98DF\u7269\u6765\u6E90\u8F83\u7A33\u5B9A\uFF0C\u5148\u4FDD\u7559\u8FD9\u4E9B\u4E60\u60EF\uFF1B\u6709\u660E\u786E\u8BAD\u7EC3\u76EE\u6807\u65F6\uFF0C\u53EF\u770B\u4E0B\u9762\u7684\u76EE\u6807\u9009\u9879\u3002",
        disclaimer: "\u6839\u636E\u672C\u6B21\u996E\u98DF\u4E0E\u751F\u6D3B\u8BB0\u5F55\u6574\u7406\uFF0C\u4E0D\u4EE3\u8868\u4F53\u5185\u7F3A\u4E4F\u8BCA\u65AD\u6216\u5904\u65B9\u3002\u8865\u5145\u91CF\u9700\u7ED3\u5408\u5E74\u9F84\u3001\u98DF\u54C1\u6807\u7B7E\u548C\u5DF2\u6709\u533B\u5631\u3002",
        notice: null
      };
    }
    module.exports = { buildPlanReport: buildPlanReport2, getReportSource: (id) => SOURCES[id] || null };
  }
});

// resources/bubu-source/engine/flow-v5.js
var require_flow_v5 = __commonJS({
  "resources/bubu-source/engine/flow-v5.js"(exports, module) {
    "use strict";
    var { QUESTIONS: QUESTIONS2, MODES } = require_questions_v5();
    var legacy = require_matcher();
    var { buildPlanReport: buildPlanReport2 } = require_recommendations_v5();
    var list = (value) => Array.isArray(value) ? value : [];
    var has = (a, id) => list(a).includes(id);
    var normalizeMultiAnswer2 = legacy.normalizeMultiAnswer;
    function getSafetyDisposition2(answers = {}) {
      const selected = list(answers.safety);
      const urgent = selected.filter((id) => id.startsWith("urgent_"));
      if (has(answers.goals, "eyes") && (answers.goal_detail || {}).eyes === "acute") urgent.push("urgent_vision");
      return {
        status: urgent.length ? "stop" : "continue",
        title: urgent.length ? "\u8BF7\u5148\u5904\u7406\u5F53\u524D\u7684\u4E0D\u9002" : "\u7EE7\u7EED\u4E86\u89E3\u4F60\u7684\u996E\u98DF",
        message: urgent.length ? "\u8FD9\u4E9B\u60C5\u51B5\u9700\u8981\u7ACB\u5373\u8054\u7CFB\u5F53\u5730\u6025\u6551\u6216\u6025\u8BCA\u3002\u8BF7\u4E0D\u8981\u7B49\u5F85\u95EE\u5377\u7ED3\u679C\uFF0C\u4E5F\u4E0D\u8981\u7528\u8865\u5145\u5242\u81EA\u884C\u5904\u7406\u3002" : "",
        reasons: urgent,
        blockedTargets: [],
        educationOnly: false
      };
    }
    function buildQuestionPlan2(mode = "quick", answers = {}) {
      const detailed = mode === "detailed";
      const goals = list(answers.goals);
      const sleep = goals.some((id) => ["sleep", "stress", "fatigue", "brain"].includes(id));
      const training = goals.some((id) => ["strength", "endurance"].includes(id)) || list(answers.scenes).some((id) => ["strength_training", "endurance_training"].includes(id));
      const health = list(answers.safety).some((id) => !["none", "unknown", "persistent_symptoms"].includes(id));
      const ids = ["audience", "profile"];
      if (answers.audience === "minor_under_18") ids.push("child_detail");
      ids.push("safety");
      if (getSafetyDisposition2(answers).status === "stop") return ids.filter((id) => ["audience", "profile", "safety"].includes(id)).map((id) => QUESTIONS2[id]);
      if (health) ids.push("health_detail");
      if (answers.audience === "minor_under_18") return ids.concat(["goals", "exclusions", "child_food", "existing_sources"]).map((id) => {
        const q = QUESTIONS2[id];
        return id === "profile" ? { ...q, fields: q.fields.filter((f) => ["age", "sex"].includes(f.id)) } : q;
      });
      ids.push("scenes");
      if (detailed) ids.push("daily_load");
      ids.push("goals");
      if (goals.filter((id) => id !== "none").length > 1) ids.push("goal_priority");
      if (sleep) ids.push("sleep_detail");
      if (detailed && sleep) ids.push("sleep_context", "impact");
      if (detailed && goals.some((id) => ["skin", "hair", "eyes", "gut"].includes(id))) ids.push("goal_detail");
      ids.push("diet_style", "exclusions");
      if (detailed) {
        ids.push("diet_habits", "dairy_food");
        if (["dairy", "fortified", "unfortified", "unknown"].includes((answers.dairy_food || {}).kind)) ids.push("calcium_label");
        ids.push("calcium_alternatives", "animal_food", "plant_food", "plant_types");
      } else {
        ids.push("quick_food");
        if (["rare", "unknown"].includes((answers.quick_food || {}).calcium)) ids.push("calcium_alternatives");
      }
      ids.push("fortified");
      if (detailed) ids.push("cooking");
      ids.push("daylight");
      if (detailed) {
        if ((answers.profile || {}).sex !== "male") ids.push("menstrual");
        ids.push("labs");
      }
      if ((detailed || training) && answers.audience !== "minor_under_18") ids.push("training_detail");
      ids.push("existing_sources", "preferences");
      return ids.map((id) => {
        const q = QUESTIONS2[id];
        if (id === "profile" && !detailed) return { ...q, fields: q.fields.filter((f) => ["sex", "life_stage"].includes(f.id)) };
        if (id === "goal_priority") return { ...q, options: [...QUESTIONS2.goals.options.filter((o) => goals.includes(o.id) && o.id !== "none"), ...q.options] };
        if (id === "goal_detail") return { ...q, fields: q.fields.filter((f) => f.id === "skin" && goals.some((x) => ["skin", "hair"].includes(x)) || goals.includes(f.id)) };
        return q;
      });
    }
    function validateStep2(questionOrId, answer, answers = {}) {
      const q = typeof questionOrId === "string" ? QUESTIONS2[questionOrId] : questionOrId;
      if (!q) return { valid: false, message: "\u8BF7\u8FD4\u56DE\u4E0A\u4E00\u9898\u540E\u91CD\u8BD5\u3002" };
      if (q.type === "profile") {
        const value = answer || {};
        for (const f of q.fields) {
          const v = value[f.id];
          if (f.type === "number") {
            if (v === "" || v === void 0 || v === null) continue;
            if (!Number.isFinite(Number(v)) || Number(v) < f.min || Number(v) > f.max) return { valid: false, message: `\u8BF7\u68C0\u67E5${f.title}\uFF0C\u4E5F\u53EF\u4EE5\u7559\u7A7A\u3002` };
            if (f.id === "age" && (!Number.isInteger(Number(v)) || answers.audience === "adult_18_64" && (v < 18 || v >= 65) || answers.audience === "senior_65_plus" && v < 65 || answers.audience === "minor_under_18" && v >= 18)) return { valid: false, message: "\u5E74\u9F84\u4E0E\u524D\u9762\u9009\u62E9\u7684\u5E74\u9F84\u6BB5\u4E0D\u540C\uFF0C\u8BF7\u68C0\u67E5\u3002" };
          } else if (f.required && !f.options.some((o) => o.id === v)) return { valid: false, message: `\u8BF7\u5B8C\u6210\u201C${f.title}\u201D\uFF0C\u4E5F\u53EF\u4EE5\u9009\u62E9\u4E0D\u8BF4\u660E\u3002` };
        }
        if (q.id === "calcium_label" && Boolean(value.ml) !== Boolean(value.mg)) return { valid: false, message: "\u8BF7\u540C\u65F6\u586B\u5199\u996E\u7528\u91CF\u548C\u6807\u7B7E\u542B\u9499\u91CF\uFF0C\u6216\u628A\u4E24\u9879\u90FD\u7559\u7A7A\u3002" };
        return { valid: true, message: "" };
      }
      if (q.type === "training") {
        const base2 = legacy.validateStep(q, answer, answers);
        if (!base2.valid) return base2;
        const v = answer || {};
        if (!["new", "stable", "none"].includes(v.stable) || !["no", "yes", "unknown"].includes(v.sweat)) return { valid: false, message: "\u8BF7\u8865\u5145\u8BAD\u7EC3\u6301\u7EED\u65F6\u95F4\u548C\u51FA\u6C57\u60C5\u51B5\u3002" };
        if (v.frequency !== "zero" && (!list(v.types).every((id) => q.fields.find((f) => f.id === "types").options.some((o) => o.id === id)) || v.duration === "not_applicable" || v.stable === "none" || v.protein_access === "not_applicable")) return { valid: false, message: "\u4F60\u9009\u62E9\u4E86\u89C4\u5F8B\u8BAD\u7EC3\uFF0C\u8BF7\u8865\u5145\u5BF9\u5E94\u7684\u65F6\u957F\u3001\u6301\u7EED\u65F6\u95F4\u548C\u8FDB\u9910\u60C5\u51B5\u3002" };
        return { valid: true, message: "" };
      }
      if (q.type === "multi") {
        const selected = list(answer);
        if (selected.length > 1 && selected.some((id) => list(q.exclusiveIds).includes(id))) return { valid: false, message: "\u201C\u6CA1\u6709\u201D\u548C\u201C\u4E0D\u786E\u5B9A\u201D\u4E0D\u80FD\u4E0E\u5176\u4ED6\u9009\u9879\u540C\u65F6\u9009\u62E9\u3002" };
      }
      if (q.id === "child_detail" && (answers.profile || {}).age !== "") {
        const age = Number((answers.profile || {}).age);
        const range = { infant: [0, 1], toddler: [1, 4], child: [4, 12], teen: [12, 18] }[(answer || {}).stage];
        if (Number.isFinite(age) && range && (age < range[0] || age >= range[1])) return { valid: false, message: "\u5B69\u5B50\u7684\u5E74\u9F84\u548C\u6240\u9009\u5E74\u9F84\u6BB5\u4E0D\u540C\uFF0C\u8BF7\u6838\u5BF9\u3002" };
      }
      return legacy.validateStep(q, answer, answers);
    }
    function buildQuestionnaireResult(mode = "quick", answers = {}) {
      const safety = getSafetyDisposition2(answers);
      if (safety.status === "stop") return { mode, safety, report: null };
      const incomplete = buildQuestionPlan2(mode, answers).filter((q) => !validateStep2(q, answers[q.id], answers).valid);
      if (incomplete.length) return { mode, safety, incomplete: incomplete.map((q) => q.id), report: null };
      return { mode, modeDefinition: MODES[mode] || MODES.quick, safety, report: buildPlanReport2(mode, answers) };
    }
    module.exports = { normalizeMultiAnswer: normalizeMultiAnswer2, validateStep: validateStep2, getSafetyDisposition: getSafetyDisposition2, buildQuestionPlan: buildQuestionPlan2, buildQuestionnaireResult };
  }
});

// resources/bubu-source/data/questions-v6.js
var require_questions_v6 = __commonJS({
  "resources/bubu-source/data/questions-v6.js"(exports, module) {
    "use strict";
    var previous = require_questions_v5();
    var options = (pairs) => pairs.map(([id, label]) => ({ id, label }));
    var field = (id, title, pairs, type = "single") => ({ id, title, type, required: true, options: options(pairs), exclusiveIds: ["none", "unknown"] });
    var fields = (id, title, items, why) => ({ id, title, type: "fields", required: true, section: "\u8BA9\u5EFA\u8BAE\u66F4\u9002\u5408\u4F60", fields: items, why });
    var QUESTIONS2 = { ...previous.QUESTIONS };
    QUESTIONS2.safety = { ...QUESTIONS2.safety, options: QUESTIONS2.safety.options.map((o) => o.id === "medication" ? { ...o, label: "\u6B63\u5728\u7528\u836F\uFF0C\u5305\u62EC\u5076\u5C14\u5403\u7684\u6B62\u75DB\u836F\u3001\u52A9\u7720\u836F\u7B49" } : o) };
    QUESTIONS2.goals = { ...QUESTIONS2.goals, options: [
      ...QUESTIONS2.goals.options.filter((o) => o.id !== "none"),
      { id: "joint", label: "\u5173\u8282\u8212\u9002\u4E0E\u6D3B\u52A8" },
      { id: "healthy_aging", label: "\u957F\u671F\u5065\u5EB7\u4E0E\u5E74\u9F84\u53D8\u5316" },
      { id: "none", label: "\u6682\u65F6\u6CA1\u6709\u7279\u522B\u5173\u6CE8\u7684" }
    ] };
    QUESTIONS2.goal_context = fields("goal_context", "\u518D\u786E\u8BA4\u4E00\u4E0B\u4F60\u60F3\u6539\u5584\u7684\u72B6\u6001", [
      field("energy", "\u767D\u5929\u6CA1\u7CBE\u795E\u66F4\u63A5\u8FD1\u54EA\u79CD\uFF1F", [
        ["occasional", "\u5076\u5C14\u75B2\u5026\uFF0C\u4F11\u606F\u540E\u80FD\u6062\u590D"],
        ["sleep_debt", "\u4E3B\u8981\u662F\u71AC\u591C\u6216\u7761\u7720\u65F6\u95F4\u4E0D\u591F"],
        ["persistent", "\u8FDE\u7EED\u6570\u5468\uFF0C\u6216\u8D8A\u6765\u8D8A\u5F71\u54CD\u5DE5\u4F5C\u751F\u6D3B"],
        ["none", "\u6CA1\u6709\u660E\u663E\u75B2\u5026"],
        ["unknown", "\u8BF4\u4E0D\u6E05"]
      ]),
      field("stress", "\u538B\u529B\u5BF9\u4F60\u7684\u5F71\u54CD", [["mild", "\u5076\u5C14\u7D27\u7EF7\uFF0C\u4F46\u57FA\u672C\u4E0D\u5F71\u54CD\u751F\u6D3B"], ["persistent", "\u6301\u7EED\u7126\u8651\u3001\u60CA\u6050\u6216\u660E\u663E\u5F71\u54CD\u65E5\u5E38"], ["none", "\u6CA1\u6709\u660E\u663E\u538B\u529B"], ["unknown", "\u8BF4\u4E0D\u6E05"]]),
      field("joint", "\u5173\u8282\u6216\u8FD0\u52A8\u540E\u7684\u4E0D\u9002", [["exercise", "\u4E3B\u8981\u662F\u8BAD\u7EC3\u540E\u7684\u808C\u8089\u9178\u75DB\uFF0C\u51E0\u5929\u5185\u7F13\u89E3"], ["knee_diagnosed", "\u533B\u751F\u5DF2\u786E\u8BA4\u819D\u9AA8\u5173\u8282\u708E"], ["unexplained", "\u6301\u7EED\u5173\u8282\u75DB\uFF0C\u8FD8\u6CA1\u786E\u8BA4\u539F\u56E0"], ["alarm", "\u7EA2\u80BF\u3001\u53D1\u70ED\u3001\u53D7\u4F24\u6216\u96BE\u4EE5\u8D1F\u91CD"], ["prevention", "\u6CA1\u6709\u4E0D\u9002\uFF0C\u60F3\u63D0\u524D\u4FDD\u517B"], ["unknown", "\u8BF4\u4E0D\u6E05"]]),
      field("sleep_timing", "\u662F\u5426\u5B58\u5728\u660E\u786E\u7684\u4F5C\u606F\u65F6\u5DEE\uFF1F", [["jetlag", "\u8FD1\u671F\u8DE8\u8D8A\u591A\u4E2A\u65F6\u533A\uFF0C\u6709\u65F6\u5DEE"], ["late_clock", "\u6709\u65F6\u95F4\u7761\uFF0C\u4F46\u957F\u671F\u8981\u5F88\u665A\u624D\u7761\u5F97\u7740"], ["shift", "\u8F6E\u73ED\u5BFC\u81F4\u7761\u7720\u65F6\u95F4\u53D8\u5316"], ["none", "\u6CA1\u6709\u4EE5\u4E0A\u60C5\u51B5"]]),
      field("gut_safety", "\u6392\u4FBF\u65B9\u9762\u8FD8\u6709\u8FD9\u4E9B\u60C5\u51B5\u5417\uFF1F", [["none", "\u6CA1\u6709\u4EE5\u4E0B\u60C5\u51B5"], ["swallowing", "\u541E\u54BD\u56F0\u96BE\uFF0C\u6216\u66FE\u6709\u80A0\u6897\u963B"], ["new_change", "\u8FD1\u6765\u6301\u7EED\u53D8\u5316\uFF0C\u6216\u9700\u8981\u7ECF\u5E38\u4F7F\u7528\u901A\u4FBF\u836F"], ["unknown", "\u4E0D\u786E\u5B9A"]])
    ], "\u540C\u4E00\u4E2A\u76EE\u6807\u53EF\u80FD\u6709\u4E0D\u540C\u539F\u56E0\u3002\u53EA\u6709\u548C\u4F60\u5B9E\u9645\u60C5\u51B5\u76F8\u7B26\u7684\u6210\u5206\u624D\u4F1A\u8FDB\u5165\u5EFA\u8BAE\u3002");
    QUESTIONS2.supplement_scope = fields("supplement_scope", "\u5E0C\u671B\u65B9\u6848\u5305\u542B\u54EA\u4E9B\u9009\u62E9\uFF1F", [
      field("functional", "\u9664\u4E86\u57FA\u7840\u8425\u517B\uFF0C\u4F60\u5E0C\u671B", [["yes", "\u4E5F\u4E86\u89E3\u7761\u7720\u3001\u8BAD\u7EC3\u7B49\u76EE\u6807\u578B\u8865\u5145\u5242"], ["no", "\u53EA\u770B\u57FA\u7840\u8425\u517B\u4E0E\u996E\u98DF"], ["unknown", "\u5148\u7ED9\u6211\u57FA\u7840\u5EFA\u8BAE"]]),
      field("botanicals", "\u59DC\u9EC4\u3001\u4EBA\u53C2\u7B49\u690D\u7269\u63D0\u53D6\u7269", [["yes", "\u53EF\u4EE5\u4E86\u89E3\u9002\u5408\u6211\u7684\u690D\u7269\u6210\u5206"], ["no", "\u6682\u65F6\u4E0D\u8003\u8651\u690D\u7269\u63D0\u53D6\u7269"], ["unknown", "\u8FD8\u6CA1\u60F3\u597D"]])
    ], "\u690D\u7269\u63D0\u53D6\u7269\u4E0E\u7EF4\u751F\u7D20\u4E0D\u662F\u4E00\u56DE\u4E8B\uFF0C\u4F1A\u5355\u72EC\u6838\u5BF9\u9002\u7528\u573A\u666F\u548C\u6CE8\u610F\u4E8B\u9879\uFF1B\u4E0D\u9ED8\u8BA4\u8D8A\u591A\u8D8A\u597D\u3002");
    QUESTIONS2.botanical_safety = {
      id: "botanical_safety",
      title: "\u690D\u7269\u6210\u5206\u4F7F\u7528\u524D\uFF0C\u518D\u6838\u5BF9\u51E0\u4E2A\u7EC6\u8282",
      type: "multi",
      required: true,
      section: "\u690D\u7269\u6210\u5206",
      helper: "\u53EF\u591A\u9009\uFF0C\u5305\u62EC\u5076\u5C14\u4F7F\u7528\u7684\u975E\u5904\u65B9\u836F\u3002",
      noneOptionId: "none",
      exclusiveIds: ["none", "unknown"],
      why: "\u8FD9\u4E9B\u60C5\u51B5\u53EF\u80FD\u5F71\u54CD\u59DC\u9EC4\u3001\u4EBA\u53C2\u7B49\u63D0\u53D6\u7269\u7684\u9002\u7528\u6027\u3002\u505A\u996D\u7528\u7684\u9999\u6599\u4E0E\u6D53\u7F29\u63D0\u53D6\u7269\u4E0D\u80FD\u7B49\u540C\u3002",
      options: options([
        ["medicines", "\u4EFB\u4F55\u5904\u65B9\u6216\u975E\u5904\u65B9\u836F\uFF0C\u5305\u62EC\u5076\u5C14\u5403\u7684\u6B62\u75DB\u836F\u3001\u5B89\u7720\u836F"],
        ["liver_gallbladder", "\u809D\u75C5\u3001\u809D\u529F\u80FD\u5F02\u5E38\u3001\u80C6\u7ED3\u77F3\u6216\u80C6\u9053\u95EE\u9898"],
        ["glucose", "\u8840\u7CD6\u5F02\u5E38\u3001\u7CD6\u5C3F\u75C5\u6216\u4F4E\u8840\u7CD6\u53D1\u4F5C"],
        ["autoimmune", "\u81EA\u8EAB\u514D\u75AB\u75BE\u75C5\u6216\u514D\u75AB\u6291\u5236\u6CBB\u7597"],
        ["bleeding", "\u5BB9\u6613\u51FA\u8840\u3001\u51DD\u8840\u95EE\u9898\u6216\u8FD1\u671F\u8BA1\u5212\u624B\u672F"],
        ["reaction", "\u690D\u7269\u6210\u5206\u8FC7\u654F\u6216\u66FE\u6709\u4E0D\u826F\u53CD\u5E94"],
        ["none", "\u4EE5\u4E0A\u90FD\u6CA1\u6709"],
        ["unknown", "\u6709\u4E9B\u60C5\u51B5\u4E0D\u786E\u5B9A"]
      ])
    };
    QUESTIONS2.existing_sources = { ...QUESTIONS2.existing_sources, options: [
      ...QUESTIONS2.existing_sources.options,
      ...options([["ginseng", "\u4EBA\u53C2 / \u897F\u6D0B\u53C2 / \u7EA2\u53C2"], ["turmeric", "\u59DC\u9EC4 / \u59DC\u9EC4\u7D20"], ["theanine", "\u8336\u6C28\u9178"], ["melatonin", "\u892A\u9ED1\u7D20"], ["collagen", "\u80F6\u539F\u86CB\u767D"], ["psyllium", "\u8F66\u524D\u5B50\u58F3\u7B49\u7EA4\u7EF4\u8865\u5145\u5242"]])
    ] };
    var MODE = { id: "detailed", title: "\u4E2A\u4EBA\u8865\u5145\u65B9\u6848", timeLabel: "\u7EA6 12\u201318 \u5206\u949F", estimatedMinutes: [12, 18] };
    module.exports = { QUESTIONS: QUESTIONS2, MODES: { detailed: MODE }, QUESTION_IDS: previous.QUESTION_IDS, OPTION_IDS: previous.OPTION_IDS, getModeDefinition: () => MODE };
  }
});

// resources/bubu-source/engine/recommendations-v6.js
var require_recommendations_v6 = __commonJS({
  "resources/bubu-source/engine/recommendations-v6.js"(exports, module) {
    "use strict";
    var previous = require_recommendations_v5();
    var list = (v) => Array.isArray(v) ? v : [];
    var SOURCES = {
      ginseng: { title: "NCCIH \xB7 \u4EBA\u53C2\uFF1A\u7528\u9014\u4E0E\u5B89\u5168", url: "https://www.nccih.nih.gov/health/asian-ginseng" },
      turmeric: { title: "NCCIH \xB7 \u59DC\u9EC4\uFF1A\u7528\u9014\u4E0E\u5B89\u5168", url: "https://www.nccih.nih.gov/health/turmeric" },
      turmeric_exercise: { title: "2025 \xB7 \u59DC\u9EC4\u4E0E\u8FD0\u52A8\u6062\u590D\u968F\u673A\u8BD5\u9A8C", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12498372/" },
      magnesium_sleep: { title: "2025 \xB7 \u7518\u6C28\u9178\u9541\u4E0E\u7761\u7720\u968F\u673A\u8BD5\u9A8C", url: "https://pubmed.ncbi.nlm.nih.gov/40918053/" },
      theanine: { title: "2019 \xB7 \u8336\u6C28\u9178\u4E0E\u65E5\u5E38\u538B\u529B\u968F\u673A\u8BD5\u9A8C", url: "https://pubmed.ncbi.nlm.nih.gov/31623400/" },
      theanine_anxiety: { title: "2019 \xB7 \u8336\u6C28\u9178\u4E0D\u66FF\u4EE3\u7126\u8651\u6CBB\u7597", url: "https://pubmed.ncbi.nlm.nih.gov/30580081/" },
      melatonin: { title: "NCCIH \xB7 \u892A\u9ED1\u7D20", url: "https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know" },
      multivitamin: { title: "NIH ODS \xB7 \u590D\u5408\u7EF4\u751F\u7D20\u77FF\u7269\u8D28", url: "https://ods.od.nih.gov/factsheets/MVMS-HealthProfessional/" },
      psyllium: { title: "MedlinePlus \xB7 \u8F66\u524D\u5B50\u58F3", url: "https://medlineplus.gov/druginfo/meds/a601104.html" },
      fiber_guideline: { title: "AGA / ACG \xB7 \u7EA4\u7EF4\u4E0E\u6392\u4FBF\u6307\u5357", url: "https://gastro.org/press-releases/acg-and-aga-guideline-on-chronic-constipation-management-is-first-to-recommend-supplements-magnesium-oxide-and-senna-as-evidence-based-treatments/" }
    };
    var getReportSource2 = (id) => SOURCES[id] || previous.getReportSource(id);
    var detail = (title, body) => ({ title, body });
    var GROUPS = {
      foundation: { title: "\u8865\u8DB3\u65E5\u5E38\u8425\u517B", intro: "\u628A\u5E73\u65F6\u4E0D\u5BB9\u6613\u5403\u5230\u7684\u6765\u6E90\u8865\u4E0A\uFF0C\u5148\u770B\u8FD9\u4E00\u7EC4\u3002" },
      sleep: { title: "\u7761\u7720\u4E0E\u653E\u677E", intro: "\u6309\u7761\u7720\u7C7B\u578B\u548C\u538B\u529B\u7A0B\u5EA6\u7B5B\u9009\uFF1B\u8FD9\u4E00\u7EC4\u5148\u9009\u62E9\u4E00\u79CD\uFF0C\u4E0D\u53E0\u52A0\u5C1D\u8BD5\u3002" },
      training: { title: "\u529B\u91CF\u4E0E\u8FD0\u52A8\u6062\u590D", intro: "\u56F4\u7ED5\u8BAD\u7EC3\u8868\u73B0\u3001\u86CB\u767D\u8D28\u4FBF\u5229\u6027\u548C\u957F\u65F6\u51FA\u6C57\u5B89\u6392\u3002" },
      energy: { title: "\u767D\u5929\u7CBE\u529B", intro: "\u9488\u5BF9\u4F60\u63CF\u8FF0\u7684\u75B2\u5026\u7C7B\u578B\uFF0C\u9009\u62E9\u989D\u5916\u652F\u6301\u3002" },
      joint: { title: "\u6D3B\u52A8\u4E0E\u6062\u590D", intro: "\u533A\u5206\u8FD0\u52A8\u540E\u7684\u9178\u75DB\u4E0E\u9700\u8981\u68C0\u67E5\u7684\u5173\u8282\u75DB\u3002" },
      gut: { title: "\u6392\u4FBF\u4E0E\u6D88\u5316", intro: "\u6309\u6392\u4FBF\u7C7B\u578B\u9009\u62E9\uFF0C\u4E0D\u628A\u6240\u6709\u80A0\u80C3\u95EE\u9898\u90FD\u4EA4\u7ED9\u76CA\u751F\u83CC\u3002" },
      skin: { title: "\u76AE\u80A4\u72B6\u6001", intro: "\u65E5\u5E38\u9632\u6652\u3001\u4FDD\u6E7F\u548C\u6B63\u5E38\u996E\u98DF\u4E4B\u5916\u7684\u81EA\u9009\u65B9\u5411\u3002" }
    };
    function buildRecommendationReport2(a = {}) {
      const base2 = previous.buildPlanReport("detailed", a);
      const goals = list(a.goals), scope = a.supplement_scope || {}, context = a.goal_context || {}, profile = a.profile || {};
      const sleep = list(a.sleep_detail), sc = a.sleep_context || {}, health = a.health_detail || {}, existing = list(a.existing_sources);
      const safety = list(a.safety), conditions = list(health.conditions), meds = list(health.medicines), excluded = list(a.exclusions);
      const adult = a.audience !== "minor_under_18";
      const reproductive = ["planning", "pregnant", "lactating", "unknown"].includes(profile.life_stage);
      const specialHealth = safety.some((id) => id !== "none") || conditions.some((id) => id !== "none") || meds.some((id) => id !== "none");
      const abnormalLabs = list(a.labs).some((id) => !["none", "unknown"].includes(id));
      const existingUnknown = existing.some((id) => ["unknown", "other", "multivitamin"].includes(id));
      const unknownAllergy = excluded.some((id) => ["unknown", "other"].includes(id));
      const safe = adult && !reproductive && !specialHealth && !abnormalLabs && !existingUnknown && !unknownAllergy && profile.weight_change !== "unintentional";
      const functional = safe && scope.functional === "yes" && (a.preferences || {}).approach !== "food";
      const botanicalSafe = safe && scope.botanicals === "yes" && list(a.botanical_safety).length === 1 && a.botanical_safety[0] === "none" && (a.preferences || {}).approach !== "food";
      const existingHas = (id) => existing.includes(id) || id === "magnesium_glycinate" && existing.includes("magnesium");
      const candidates = [], foodActions = [], followUps = base2.checks.filter((c) => c.medical || !["calcium", "vitamin_d", "b12"].includes(c.id));
      const rows = base2.coverage.flatMap((g) => g.items);
      const byId = (id) => rows.find((r) => r.id === id);
      function add(input) {
        if (existingHas(input.id) || candidates.some((c2) => c2.id === input.id)) return;
        const c = { selected: false, expanded: false, selectable: true, tag: "\u53EF\u9009\u8865\u5145", details: [], sources: [], ...input };
        candidates.push(c);
      }
      function review(id, title, reason, action) {
        if (!followUps.some((r) => r.id === id)) followUps.push({ id, title, reason, action });
      }
      function functionalCard(id, title, group, reason, benefit, food, evidence, caution, sourceIds, extra = {}) {
        add({
          id,
          title,
          group,
          reason,
          benefit,
          food,
          caution,
          tag: "\u76EE\u6807\u578B\u53EF\u9009",
          details: [detail("\u9009\u62E9\u4F9D\u636E", evidence), detail("\u600E\u6837\u9009\u62E9\u4E0E\u4F7F\u7528", "\u5148\u6838\u5BF9\u5355\u65B9\u6210\u5206\u3001\u5B9E\u9645\u542B\u91CF\u4E0E\u914D\u65B9\u6807\u7B7E\uFF0C\u4E00\u6B21\u53EA\u5C1D\u8BD5\u4E00\u79CD\u65B0\u6210\u5206\u3002\u8FD9\u91CC\u4E0D\u628A\u7814\u7A76\u7528\u91CF\u76F4\u63A5\u5199\u6210\u4F60\u7684\u6BCF\u65E5\u5242\u91CF\u3002")],
          sources: sourceIds.map((id2) => ({ id: id2, title: getReportSource2(id2).title })),
          ...extra
        });
      }
      const nutrientForms = {
        vitamin_d: ["\u7EF4\u751F\u7D20 D", "\u5E2E\u52A9\u9499\u5438\u6536\uFF0C\u652F\u6301\u9AA8\u9ABC\u4E0E\u808C\u8089\u6B63\u5E38\u529F\u80FD\u3002"],
        calcium: ["\u9499\u8865\u5145\u5242", "\u8865\u4E0A\u98DF\u7269\u4E2D\u96BE\u4EE5\u7A33\u5B9A\u83B7\u5F97\u7684\u9499\u6765\u6E90\u3002"],
        b12: ["\u7EF4\u751F\u7D20 B12", "\u652F\u6301\u795E\u7ECF\u529F\u80FD\u548C\u7EA2\u7EC6\u80DE\u5F62\u6210\uFF0C\u7EAF\u7D20\u996E\u98DF\u5C24\u5176\u9700\u8981\u53EF\u9760\u6765\u6E90\u3002"],
        magnesium: ["\u9541\u8865\u5145\u5242", "\u8865\u5145\u504F\u5C11\u7684\u9541\u6765\u6E90\uFF0C\u652F\u6301\u6B63\u5E38\u795E\u7ECF\u4E0E\u808C\u8089\u529F\u80FD\u3002"],
        omega3: [a.diet_style === "vegan" || a.diet_style === "vegetarian" || excluded.includes("fish") ? "\u85FB\u6CB9 \xB7 EPA / DHA" : "\u9C7C\u6CB9 / \u85FB\u6CB9 \xB7 EPA / DHA", "\u4E3A\u5F88\u5C11\u5403\u5BCC\u8102\u9C7C\u7684\u65E5\u5E38\u589E\u52A0 EPA / DHA \u6765\u6E90\u3002"],
        vitamin_c: ["\u7EF4\u751F\u7D20 C", "\u5728\u852C\u679C\u957F\u671F\u4E0D\u8DB3\u3001\u6682\u65F6\u96BE\u4EE5\u6539\u5584\u65F6\u8865\u5145\u7EF4 C \u6765\u6E90\u3002"]
      };
      const low = base2.cards.filter((r) => ["food", "supplement"].includes(r.state));
      for (const r of low) {
        const form = nutrientForms[r.id];
        if (safe && form && (a.preferences || {}).approach !== "food") {
          add({
            ...r,
            title: form[0],
            group: "foundation",
            benefit: form[1],
            food: r.action,
            tag: r.state === "supplement" ? "\u4F18\u5148\u8003\u8651" : "\u996E\u98DF\u4E0D\u8DB3\u65F6\u53EF\u8865",
            caution: r.caution || "\u5148\u6838\u5BF9\u5DF2\u6709\u4EA7\u54C1\u548C\u6807\u7B7E\u542B\u91CF\uFF0C\u4E0D\u53E0\u52A0\u9AD8\u5242\u91CF\u3002",
            rank: void 0,
            details: r.details.filter((d) => d.title !== "\u8FD9\u6B21\u5224\u65AD\u7684\u8303\u56F4"),
            selectable: true,
            selected: false,
            expanded: false
          });
        } else if (!foodActions.some((f) => f.id === r.id)) foodActions.push({ id: r.id, title: r.title, reason: r.reason, action: r.action });
      }
      const multiGaps = low.filter((r) => r.group === "vitamins" || r.group === "minerals");
      const habits = a.diet_habits || {};
      if (safe && (a.preferences || {}).approach !== "food" && multiGaps.length >= 3 && ["months", "long"].includes(habits.duration) && (habits.meals === "one_two" || habits.restriction === "many_foods") && !low.some((r) => r.id === "b12" && r.essential)) {
        functionalCard(
          "multivitamin",
          "\u57FA\u7840\u590D\u5408\u7EF4\u751F\u7D20\u77FF\u7269\u8D28\uFF08\u65E0\u94C1\uFF09",
          "foundation",
          "\u4F60\u8F83\u957F\u65F6\u95F4\u6F0F\u9910\u6216\u9650\u5236\u591A\u7C7B\u98DF\u7269\uFF0C\u800C\u4E14\u4E0D\u6B62\u4E00\u7C7B\u8425\u517B\u6765\u6E90\u504F\u5C11\u3002",
          "\u7528\u4E00\u6B3E\u57FA\u7840\u914D\u65B9\u8865\u5145\u591A\u7C7B\u6765\u6E90\uFF0C\u4F5C\u4E3A\u9010\u6B65\u6062\u590D\u6B63\u5E38\u996E\u98DF\u7684\u8FC7\u6E21\u3002",
          "\u628A\u80FD\u63A5\u53D7\u7684\u4E3B\u98DF\u3001\u86CB\u767D\u98DF\u7269\u3001\u852C\u83DC\u548C\u6C34\u679C\u91CD\u65B0\u5B89\u6392\u5230\u6B63\u9910\u3002",
          "\u590D\u5408\u4EA7\u54C1\u53EF\u589E\u52A0\u591A\u79CD\u8425\u517B\u7D20\u6444\u5165\uFF0C\u4F46\u4E0D\u80FD\u66FF\u4EE3\u98DF\u7269\uFF0C\u4E5F\u4E0D\u4FDD\u8BC1\u9884\u9632\u75BE\u75C5\u3002\u4F18\u5148\u57FA\u7840\u914D\u65B9\uFF0C\u4E0D\u9009\u8D85\u9AD8\u5242\u91CF\u6216\u201C\u8D8A\u5168\u8D8A\u597D\u201D\u7684\u53E0\u52A0\u65B9\u6848\u3002",
          "\u4E0E\u5355\u65B9\u7EF4\u751F\u7D20\u3001\u77FF\u7269\u8D28\u62E9\u4E00\u89C4\u5212\uFF0C\u5148\u6838\u5BF9\u6807\u7B7E\uFF1B\u94C1\u4E0D\u9ED8\u8BA4\u52A0\u5165\u3002",
          ["multivitamin"],
          { tag: "\u591A\u7C7B\u6765\u6E90\u4E0D\u8DB3\u65F6\u53EF\u9009", alternativeGroup: "micronutrient_plan" }
        );
      }
      for (const r of base2.optional) {
        if (!functional || !["creatine", "protein", "hydration"].includes(r.id)) continue;
        add({ ...r, group: "training", food: r.action, benefit: { creatine: "\u8F85\u52A9\u53CD\u590D\u77ED\u65F6\u9AD8\u5F3A\u5EA6\u8FD0\u52A8\uFF0C\u652F\u6301\u529B\u91CF\u8BAD\u7EC3\u8868\u73B0\u3002", protein: "\u5728\u6B63\u9910\u4E0D\u65B9\u4FBF\u65F6\uFF0C\u63D0\u4F9B\u5BB9\u6613\u5B89\u6392\u7684\u86CB\u767D\u8D28\u6765\u6E90\u3002", hydration: "\u957F\u65F6\u95F4\u5927\u91CF\u51FA\u6C57\u65F6\uFF0C\u5E2E\u52A9\u8865\u56DE\u6C34\u5206\u548C\u7535\u89E3\u8D28\u3002" }[r.id], tag: "\u8BAD\u7EC3\u53EF\u9009", rank: void 0 });
      }
      const concerningSleep = a.impact === "persistent_impairing" || list(sc.interference).includes("snoring") || sc.frequency === "often" && sc.duration === "long";
      const poorSleep = sleep.some((id) => ["sleep_hard_to_start", "sleep_waking", "sleep_early_waking"].includes(id));
      if (functional && goals.includes("sleep") && poorSleep && !concerningSleep && ["middle", "enough"].includes(sc.hours) && !existing.includes("magnesium") && !existing.includes("melatonin") && a.audience === "adult_18_64") {
        const current = candidates.findIndex((c) => c.id === "magnesium");
        const foodReason = current >= 0 ? candidates[current].reason + " " : "";
        if (current >= 0) candidates.splice(current, 1);
        functionalCard(
          "magnesium_glycinate",
          "\u7518\u6C28\u9178\u9541",
          "sleep",
          foodReason + "\u4F60\u6709\u5165\u7761\u6216\u591C\u9192\u56F0\u6270\uFF0C\u4E5F\u4E3A\u7761\u7720\u7559\u51FA\u4E86\u65F6\u95F4\u3002",
          "\u53EF\u4EE5\u4F5C\u4E3A\u7761\u7720\u652F\u6301\u7684\u53EF\u9009\u5C1D\u8BD5\uFF0C\u9884\u671F\u6539\u5584\u5E45\u5EA6\u8F83\u5C0F\uFF1B\u4E0D\u662F\u7F3A\u9541\u8BCA\u65AD\u3002",
          "\u9541\u4E5F\u6765\u81EA\u5168\u8C37\u3001\u8C46\u7C7B\u3001\u7EFF\u53F6\u83DC\u548C\u53EF\u8010\u53D7\u7684\u575A\u679C\uFF1B\u7761\u524D\u653E\u677E\u548C\u56FA\u5B9A\u8D77\u5E8A\u65F6\u95F4\u4ECD\u8981\u4FDD\u7559\u3002",
          "2025 \u5E74\u4E00\u9879 155 \u4EBA\u30014 \u5468\u968F\u673A\u8BD5\u9A8C\u4E2D\uFF0C\u7518\u6C28\u9178\u9541\u5BF9\u81EA\u8BC4\u5931\u7720\u8BC4\u5206\u7684\u6539\u5584\u7565\u9AD8\u4E8E\u5B89\u6170\u5242\uFF0C\u6548\u5E94\u8F83\u5C0F\u3002\u4E0D\u80FD\u636E\u6B64\u627F\u8BFA\u6CBB\u7597\u5931\u7720\u6216\u8BA4\u5B9A\u8FD9\u79CD\u5F62\u5F0F\u4F18\u4E8E\u6240\u6709\u9541\u3002",
          "\u4E0D\u8981\u4E0E\u5176\u4ED6\u9541\u6216\u52A9\u7720\u914D\u65B9\u53E0\u52A0\uFF1B\u80BE\u75C5\u3001\u7528\u836F\u6216\u957F\u671F\u7761\u7720\u969C\u788D\u5148\u786E\u8BA4\u9002\u7528\u6027\u3002",
          ["magnesium_sleep", "magnesium"],
          { alternativeGroup: "sleep_support", tag: "\u7761\u7720\u53EF\u9009 \xB7 \u5C0F\u5E45\u6539\u5584" }
        );
      }
      if (functional && goals.includes("stress") && context.stress === "mild" && !concerningSleep && a.impact !== "persistent_impairing" && !existing.some((id) => ["melatonin", "magnesium", "theanine"].includes(id))) {
        functionalCard(
          "theanine",
          "L-\u8336\u6C28\u9178",
          "sleep",
          "\u4F60\u63CF\u8FF0\u7684\u662F\u5076\u5C14\u7D27\u7EF7\uFF0C\u5E0C\u671B\u5728\u4E0D\u5F71\u54CD\u65E5\u5E38\u751F\u6D3B\u7684\u60C5\u51B5\u4E0B\u66F4\u5BB9\u6613\u653E\u677E\u3002",
          "\u53EF\u4F5C\u4E3A\u65E5\u5E38\u653E\u677E\u7684\u81EA\u9009\u5C1D\u8BD5\uFF0C\u4E0D\u7528\u4E8E\u6CBB\u7597\u7126\u8651\u75C7\u3002",
          "\u8336\u542B\u8336\u6C28\u9178\u4E5F\u5E38\u542B\u5496\u5561\u56E0\uFF1B\u665A\u95F4\u4E0D\u9760\u591A\u559D\u6D53\u8336\u83B7\u5F97\u540C\u7B49\u6548\u679C\u3002",
          "\u4E00\u9879 30 \u4EBA\u30014 \u5468\u5C0F\u578B\u8BD5\u9A8C\u63D0\u793A\u90E8\u5206\u538B\u529B\u4E0E\u7761\u7720\u6307\u6807\u6539\u5584\u3002\u7814\u7A76\u89C4\u6A21\u5C0F\uFF1B\u53E6\u4E00\u9879\u7126\u8651\u969C\u788D\u8BD5\u9A8C\u672A\u652F\u6301\u6297\u7126\u8651\u7597\u6548\uFF0C\u4E0D\u80FD\u628A\u5B83\u5F53\u4F5C\u6CBB\u7597\u65B9\u6848\u3002",
          "\u5148\u4E0E\u5176\u4ED6\u7761\u7720\u652F\u6301\u6210\u5206\u62E9\u4E00\uFF1B\u51FA\u73B0\u5934\u6655\u6216\u55DC\u7761\u65F6\u505C\u6B62\uFF0C\u6301\u7EED\u7126\u8651\u8BF7\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002",
          ["theanine", "theanine_anxiety"],
          { alternativeGroup: "sleep_support", tag: "\u653E\u677E\u81EA\u9009 \xB7 \u6548\u679C\u56E0\u4EBA\u800C\u5F02" }
        );
      }
      if (functional && goals.includes("sleep") && context.sleep_timing === "jetlag" && !concerningSleep && !existing.some((id) => ["melatonin", "theanine", "magnesium"].includes(id))) {
        functionalCard(
          "melatonin",
          "\u892A\u9ED1\u7D20",
          "sleep",
          "\u4F60\u8FD1\u671F\u8DE8\u8D8A\u591A\u4E2A\u65F6\u533A\uFF0C\u7761\u7720\u53D8\u5316\u4E0E\u65F6\u5DEE\u6709\u5173\u3002",
          "\u7528\u4E8E\u77ED\u671F\u8C03\u6574\u7761\u7720\u65F6\u70B9\uFF0C\u800C\u4E0D\u662F\u6240\u6709\u7761\u4E0D\u597D\u7684\u901A\u7528\u7B54\u6848\u3002",
          "\u914D\u5408\u76EE\u7684\u5730\u7684\u8D77\u5E8A\u65F6\u95F4\u548C\u5149\u7167\u5B89\u6392\uFF1B\u98DF\u7269\u4E0D\u80FD\u4EE3\u66FF\u660E\u786E\u7684\u4F5C\u606F\u8C03\u6574\u3002",
          "\u892A\u9ED1\u7D20\u53C2\u4E0E\u663C\u591C\u8282\u5F8B\u3002\u65F6\u5DEE\u662F\u6709\u7814\u7A76\u652F\u6301\u7684\u7528\u9014\u4E4B\u4E00\uFF0C\u957F\u671F\u5931\u7720\u5219\u4E0D\u662F\u9ED8\u8BA4\u4F7F\u7528\u573A\u666F\uFF1B\u670D\u7528\u65F6\u70B9\u4F1A\u5F71\u54CD\u7ED3\u679C\u3002",
          "\u5148\u5411\u836F\u5E08\u786E\u8BA4\u76EE\u7684\u5730\u3001\u65F6\u70B9\u548C\u4EA7\u54C1\uFF1B\u53EF\u80FD\u55DC\u7761\uFF0C\u4E0D\u4E0E\u9152\u7CBE\u540C\u7528\uFF0C\u4F7F\u7528\u540E\u4E0D\u9A7E\u9A76\u3002",
          ["melatonin"],
          { alternativeGroup: "sleep_support", tag: "\u77ED\u671F\u65F6\u5DEE\u53EF\u9009" }
        );
      }
      if (botanicalSafe && goals.includes("fatigue") && context.energy === "occasional" && ["middle", "enough"].includes(sc.hours) && !poorSleep && !concerningSleep && !["persistent", "unknown"].includes(context.stress) && a.impact !== "persistent_impairing") {
        functionalCard(
          "ginseng",
          "\u4EBA\u53C2\u63D0\u53D6\u7269\uFF08Panax ginseng\uFF09",
          "energy",
          "\u4F60\u662F\u5076\u5C14\u75B2\u5026\u3001\u4F11\u606F\u540E\u53EF\u6062\u590D\uFF0C\u6CA1\u6709\u63D0\u5230\u5165\u7761\u6216\u591C\u9192\u56F0\u6270\uFF0C\u5E76\u613F\u610F\u4E86\u89E3\u690D\u7269\u6210\u5206\u3002",
          "\u53EF\u4F5C\u4E3A\u4E00\u822C\u75B2\u5026\u7684\u81EA\u9009\u652F\u6301\uFF0C\u53EF\u80FD\u7684\u83B7\u76CA\u8F83\u5C0F\u3002",
          "\u5148\u4FDD\u6301\u6B63\u9910\u3001\u7761\u7720\u548C\u6062\u590D\uFF1B\u4EBA\u53C2\u4E0D\u662F\u80FD\u91CF\u6216\u86CB\u767D\u8D28\u7684\u66FF\u4EE3\u54C1\u3002",
          "\u90E8\u5206\u7814\u7A76\u63D0\u793A\u4E9A\u6D32\u4EBA\u53C2\u5BF9\u4E00\u822C\u75B2\u5026\u6709\u5C0F\u5E45\u5E2E\u52A9\uFF0C\u4F46\u7ED3\u679C\u5E76\u4E0D\u4E00\u81F4\u3002\u4E0D\u540C\u53C2\u79CD\u3001\u53D1\u9175\u5DE5\u827A\u4E0E\u63D0\u53D6\u7269\u4E0D\u80FD\u4E92\u6362\uFF0C\u4E5F\u4E0D\u628A\u5B83\u5305\u88C5\u6210\u6297\u8870\u6216\u6297\u7126\u8651\u5FC5\u9700\u54C1\u3002",
          "\u53EF\u80FD\u5F15\u8D77\u5931\u7720\u5E76\u5F71\u54CD\u8840\u7CD6\u3001\u51DD\u8840\uFF1B\u51FA\u73B0\u7761\u4E0D\u597D\u5C31\u505C\u7528\u3002\u7528\u836F\u3001\u598A\u5A20\u6216\u81EA\u8EAB\u514D\u75AB\u75BE\u75C5\u9700\u4E13\u4E1A\u6838\u5BF9\u3002",
          ["ginseng"],
          { tag: "\u690D\u7269\u53EF\u9009 \xB7 \u7CBE\u529B\u652F\u6301", alternativeGroup: "botanical" }
        );
      }
      const activeTraining = (a.training_detail || {}).frequency !== "zero" && (a.training_detail || {}).stable === "stable";
      if (botanicalSafe && context.joint === "exercise" && activeTraining && goals.some((id) => ["joint", "strength", "endurance"].includes(id))) {
        functionalCard(
          "turmeric",
          "\u59DC\u9EC4 / \u59DC\u9EC4\u7D20\u63D0\u53D6\u7269",
          "joint",
          "\u4F60\u6709\u7A33\u5B9A\u8BAD\u7EC3\uFF0C\u63CF\u8FF0\u7684\u662F\u8BAD\u7EC3\u540E\u51E0\u5929\u5185\u7F13\u89E3\u7684\u808C\u8089\u9178\u75DB\uFF0C\u5E76\u5E0C\u671B\u4E86\u89E3\u690D\u7269\u6210\u5206\u3002",
          "\u53EF\u4F5C\u4E3A\u8FD0\u52A8\u6062\u590D\u7684\u4F4E\u4F18\u5148\u7EA7\u9009\u9879\uFF1B\u4E0D\u662F\u6BCF\u5929\u5FC5\u9700\uFF0C\u4E5F\u4E0D\u80FD\u66FF\u4EE3\u5904\u7406\u8FD0\u52A8\u635F\u4F24\u3002",
          "\u5148\u5B89\u6392\u5408\u7406\u8BAD\u7EC3\u8D1F\u8377\u3001\u86CB\u767D\u8D28\u3001\u7761\u7720\uFF1B\u70F9\u8C03\u7528\u59DC\u9EC4\u53EF\u4F5C\u9999\u6599\uFF0C\u4F46\u4E0D\u7B49\u540C\u7814\u7A76\u4E2D\u7684\u63D0\u53D6\u7269\u3002",
          "\u8FD0\u52A8\u6062\u590D\u7814\u7A76\u91C7\u7528\u7279\u5B9A\u5236\u5242\uFF0C\u6837\u672C\u8F83\u5C0F\uFF0C\u7ED3\u679C\u4E0D\u5B8C\u5168\u4E00\u81F4\uFF1B\u4E0D\u80FD\u63A8\u5E7F\u6210\u6240\u6709\u59DC\u9EC4\u4EA7\u54C1\u90FD\u80FD\u201C\u6297\u708E\u201D\u3002\u5173\u8282\u708E\u7814\u7A76\u4E5F\u4E0D\u80FD\u76F4\u63A5\u5957\u7528\u4E8E\u6CA1\u6709\u8BCA\u65AD\u7684\u5173\u8282\u75DB\u3002",
          "\u6D53\u7F29\u63D0\u53D6\u7269\u6709\u809D\u635F\u4F24\u62A5\u544A\uFF0C\u4E0D\u80FD\u628A\u201C\u9AD8\u5438\u6536\u201D\u5F53\u6210\u66F4\u5B89\u5168\u3002\u51FA\u73B0\u9EC4\u75B8\u3001\u6DF1\u8272\u5C3F\u6216\u660E\u663E\u6076\u5FC3\u5E94\u505C\u7528\u5E76\u5C31\u533B\u3002",
          ["turmeric", "turmeric_exercise"],
          { tag: "\u690D\u7269\u53EF\u9009 \xB7 \u5148\u770B\u914D\u65B9", alternativeGroup: "botanical" }
        );
      }
      if (goals.includes("joint") && ["knee_diagnosed", "unexplained", "alarm"].includes(context.joint)) review(
        "joint_review",
        context.joint === "knee_diagnosed" ? "\u59DC\u9EC4\u7D20\u4E0E\u5173\u8282\u65B9\u6848" : "\u5148\u786E\u8BA4\u5173\u8282\u4E0D\u9002\u7684\u539F\u56E0",
        context.joint === "knee_diagnosed" ? "\u4F60\u5DF2\u6709\u819D\u9AA8\u5173\u8282\u708E\u8BCA\u65AD\uFF0C\u53EF\u4EE5\u628A\u59DC\u9EC4\u7D20\u4F5C\u4E3A\u4E0E\u533B\u751F\u8BA8\u8BBA\u7684\u8F85\u52A9\u9009\u9879\u3002" : "\u4F60\u63D0\u5230\u6301\u7EED\u5173\u8282\u75DB\u3001\u7EA2\u80BF\u6216\u8D1F\u91CD\u56F0\u96BE\uFF0C\u4E0D\u9002\u5408\u7528\u6062\u590D\u8865\u5242\u81EA\u884C\u5904\u7406\u3002",
        context.joint === "knee_diagnosed" ? "\u5E26\u4E0A\u7528\u836F\u548C\u5177\u4F53\u914D\u65B9\u6838\u5BF9\uFF1B\u4E0D\u66FF\u4EE3\u65E2\u6709\u6CBB\u7597\uFF0C\u4E5F\u4E0D\u76F4\u63A5\u5957\u7528\u8FD0\u52A8\u6062\u590D\u4EA7\u54C1\u3002" : "\u5B89\u6392\u5C31\u533B\uFF1B\u6025\u6027\u7EA2\u80BF\u3001\u53D1\u70ED\u6216\u65E0\u6CD5\u8D1F\u91CD\u65F6\u53CA\u65F6\u5904\u7406\u3002"
      );
      if (functional && goals.includes("gut") && (a.goal_detail || {}).gut === "constipation" && context.gut_safety === "none") {
        functionalCard(
          "psyllium",
          "\u8F66\u524D\u5B50\u58F3 \xB7 \u53EF\u6EB6\u6027\u81B3\u98DF\u7EA4\u7EF4",
          "gut",
          "\u4F60\u5173\u6CE8\u6392\u4FBF\u4E0D\u89C4\u5F8B\u6216\u504F\u5E72\uFF0C\u5E76\u672A\u62A5\u544A\u541E\u54BD\u3001\u6897\u963B\u7B49\u4F7F\u7528\u9650\u5236\u3002",
          "\u901A\u8FC7\u5438\u6C34\u589E\u52A0\u7CAA\u4FBF\u4F53\u79EF\uFF0C\u5E2E\u52A9\u6392\u4FBF\u89C4\u5F8B\u3002",
          "\u71D5\u9EA6\u3001\u6742\u8C46\u3001\u852C\u83DC\u548C\u5B8C\u6574\u6C34\u679C\u4E5F\u80FD\u589E\u52A0\u7EA4\u7EF4\uFF1B\u6162\u6162\u589E\u52A0\uFF0C\u89C2\u5BDF\u80C0\u6C14\u3002",
          "\u4E34\u5E8A\u6307\u5357\u652F\u6301\u5728\u5408\u9002\u6210\u4EBA\u4E2D\u8003\u8651\u7EA4\u7EF4\u8865\u5145\uFF0C\u5176\u4E2D\u8F66\u524D\u5B50\u58F3\u6709\u76F8\u5BF9\u76F4\u63A5\u7684\u4F9D\u636E\uFF1B\u4E0D\u540C\u7EA4\u7EF4\u5E76\u4E0D\u5B8C\u5168\u7B49\u6548\u3002",
          "\u4E0D\u5E72\u541E\uFF0C\u5FC5\u987B\u6309\u6807\u7B7E\u5145\u5206\u914D\u6C34\uFF1B\u4E0E\u836F\u7269\u95F4\u9694\u9700\u95EE\u836F\u5E08\u3002\u6301\u7EED\u4FBF\u79D8\u6216\u9700\u8981\u8FDE\u7EED\u4F7F\u7528\u65F6\u5148\u54A8\u8BE2\uFF0C\u4FBF\u8840\u6216\u660E\u663E\u8179\u75DB\u53CA\u65F6\u5C31\u533B\u3002",
          ["fiber_guideline", "psyllium"],
          { tag: "\u6392\u4FBF\u652F\u6301\u53EF\u9009" }
        );
        const idx = foodActions.findIndex((r) => r.id === "fiber");
        if (idx >= 0) foodActions.splice(idx, 1);
      }
      if (functional && goals.includes("skin") && (a.goal_detail || {}).skin === "appearance" && !["vegan", "vegetarian"].includes(a.diet_style) && !excluded.some((id) => ["fish", "shellfish"].includes(id))) {
        functionalCard(
          "collagen",
          "\u80F6\u539F\u86CB\u767D\u80BD",
          "skin",
          "\u4F60\u5173\u6CE8\u7684\u662F\u76AE\u80A4\u6C34\u5206\u3001\u5F39\u6027\u7B49\u5916\u89C2\uFF0C\u5E76\u5E0C\u671B\u4E86\u89E3\u76EE\u6807\u578B\u8865\u5145\u5242\u3002",
          "\u53EF\u81EA\u9009\u4E86\u89E3\uFF0C\u4F46\u76AE\u80A4\u6539\u5584\u5E76\u4E0D\u786E\u5B9A\uFF0C\u4E0D\u4F5C\u4E3A\u4F18\u5148\u5FC5\u4E70\u9879\u3002",
          "\u4FDD\u7559\u6B63\u5E38\u86CB\u767D\u8D28\u6444\u5165\u4E0E\u5BCC\u542B\u7EF4 C \u7684\u98DF\u7269\uFF1B\u9632\u6652\u3001\u4FDD\u6E7F\u6BD4\u589E\u52A0\u8865\u5145\u79CD\u7C7B\u66F4\u57FA\u7840\u3002",
          "\u90E8\u5206\u8BD5\u9A8C\u62A5\u544A\u76AE\u80A4\u6C34\u5206\u6216\u5F39\u6027\u6539\u5584\uFF1B2025 \u5E74\u7EFC\u8FF0\u4E2D\uFF0C\u9AD8\u8D28\u91CF\u53CA\u975E\u4EA7\u4E1A\u8D44\u52A9\u7814\u7A76\u672A\u663E\u793A\u660E\u786E\u83B7\u76CA\u3002\u4E0D\u80FD\u627F\u8BFA\u6297\u8870\uFF0C\u4E5F\u4E0D\u80FD\u66FF\u4EE3\u5B8C\u6574\u86CB\u767D\u8D28\u3002",
          "\u770B\u6E05\u9C7C\u3001\u725B\u6216\u732A\u7B49\u6765\u6E90\u548C\u8FC7\u654F\u6807\u8BC6\uFF1B\u4E0D\u628A\u80F6\u539F\u86CB\u767D\u5F53\u4F5C\u751F\u53D1\u6216\u5B8C\u6574\u86CB\u767D\u7C89\u3002",
          ["collagen"],
          { tag: "\u5916\u89C2\u81EA\u9009 \xB7 \u83B7\u76CA\u4E0D\u786E\u5B9A" }
        );
      }
      if (scope.botanicals === "yes" && !botanicalSafe) review("botanical_review", "\u690D\u7269\u6210\u5206\u9700\u8981\u5148\u6838\u5BF9", "\u4F60\u7684\u5065\u5EB7\u3001\u7528\u836F\u3001\u9636\u6BB5\u6216\u6210\u5206\u8BB0\u5F55\u4E2D\uFF0C\u6709\u9700\u8981\u8FDB\u4E00\u6B65\u786E\u8BA4\u7684\u60C5\u51B5\u3002", "\u6682\u4E0D\u628A\u4EBA\u53C2\u3001\u59DC\u9EC4\u7B49\u63D0\u53D6\u7269\u52A0\u5165\u53EF\u9009\u6E05\u5355\uFF1B\u628A\u5177\u4F53\u914D\u65B9\u4EA4\u7ED9\u533B\u751F\u6216\u836F\u5E08\u6838\u5BF9\uFF0C\u4E0D\u81EA\u884C\u505C\u836F\u3002");
      if (context.energy === "persistent" || context.stress === "persistent") review("energy_review", "\u6301\u7EED\u75B2\u5026\u6216\u538B\u529B\u5F71\u54CD\u751F\u6D3B", "\u8FD9\u5DF2\u7ECF\u8D85\u51FA\u5076\u5C14\u72B6\u6001\u6CE2\u52A8\u3002", "\u5B89\u6392\u4E13\u4E1A\u8BC4\u4F30\uFF0C\u4E0D\u7528\u4EBA\u53C2\u6216\u653E\u677E\u8865\u5242\u63A9\u76D6\u6301\u7EED\u53D8\u5316\u3002");
      if (goals.includes("gut") && context.gut_safety !== "none") review("gut_review", "\u6392\u4FBF\u53D8\u5316\u9700\u8981\u786E\u8BA4", "\u4F60\u63D0\u5230\u6301\u7EED\u53D8\u5316\u3001\u541E\u54BD\u95EE\u9898\u6216\u5C1A\u672A\u786E\u8BA4\u7684\u9650\u5236\u3002", "\u5148\u786E\u8BA4\u539F\u56E0\u4E0E\u996E\u6C34\u3001\u7528\u836F\u8981\u6C42\uFF0C\u518D\u9009\u62E9\u7EA4\u7EF4\u6216\u76CA\u751F\u83CC\u3002");
      if (!safe && adult && low.length) review("supplement_review", "\u8865\u5145\u65B9\u5F0F\u5148\u505A\u4E00\u6B21\u6838\u5BF9", "\u996E\u98DF\u4E2D\u6709\u503C\u5F97\u6539\u5584\u7684\u6765\u6E90\uFF0C\u4F46\u5065\u5EB7\u6216\u5DF2\u6709\u4EA7\u54C1\u4FE1\u606F\u4F1A\u5F71\u54CD\u8865\u5145\u9009\u62E9\u3002", "\u53EF\u5148\u53C2\u8003\u9002\u5408\u4F60\u7684\u98DF\u7269\u8C03\u6574\uFF0C\u65B0\u589E\u4EA7\u54C1\u524D\u6838\u5BF9\u9636\u6BB5\u3001\u7528\u836F\u548C\u6807\u7B7E\u3002");
      const priorityGroup = { sleep: "sleep", stress: "sleep", fatigue: "energy", strength: "training", endurance: "training", joint: "joint", skin: "skin", gut: "gut" }[a.goal_priority];
      const tier = (c) => c.essential ? 0 : c.group === "foundation" ? 1 : ["creatine", "protein", "hydration", "psyllium"].includes(c.id) ? 2 : c.id === "collagen" ? 4 : 3;
      candidates.sort((x, y) => tier(x) - tier(y) || Number(y.group === priorityGroup) - Number(x.group === priorityGroup));
      candidates.forEach((c, i) => {
        c.rank = i + 1;
        c.selected = false;
        c.expanded = false;
        if (c.group === "foundation" && c.id !== "omega3" || c.id === "magnesium_glycinate") c.micronutrient = true;
        if (["turmeric", "ginseng", "psyllium", "melatonin"].includes(c.id)) c.safetyBrief = c.caution.split("\u3002")[0] + "\u3002";
      });
      const programs = Object.keys(GROUPS).map((id) => ({ id, ...GROUPS[id], items: candidates.filter((c) => c.group === id) })).filter((g) => g.items.length).sort((x, y) => x.items[0].rank - y.items[0].rank);
      const compactFood = (candidates.length ? foodActions.filter((r) => ["potassium", "iron", "iodine", "fiber", "vitamin_a"].includes(r.id)) : foodActions).slice(0, 4);
      if (!compactFood.length && foodActions.length) compactFood.push(foodActions[0]);
      const topicGroup = { sleep_energy: "sleep", appearance: "skin", gut: "gut", eyes: "eyes" };
      for (const topic of base2.topics) {
        if (!programs.some((g) => g.id === topicGroup[topic.id])) compactFood.push({ id: topic.id, title: topic.title, reason: topic.reason, action: topic.action });
      }
      if (goals.includes("healthy_aging")) compactFood.push({ id: "healthy_aging", title: "\u957F\u671F\u5065\u5EB7\u7684\u65E5\u5E38\u5B89\u6392", reason: "\u4F60\u5E0C\u671B\u652F\u6301\u968F\u5E74\u9F84\u53D8\u5316\u7684\u957F\u671F\u72B6\u6001\u3002", action: "\u4FDD\u7559\u89C4\u5F8B\u6D3B\u52A8\u3001\u9002\u5408\u81EA\u5DF1\u7684\u529B\u91CF\u548C\u5E73\u8861\u7EC3\u4E60\u3001\u6B63\u5E38\u86CB\u767D\u8D28\u4E0E\u9AA8\u9ABC\u8425\u517B\u6765\u6E90\uFF1B\u6309\u5E74\u9F84\u548C\u65E2\u6709\u60C5\u51B5\u5B89\u6392\u5065\u5EB7\u68C0\u67E5\uFF0C\u4E0D\u7528\u6297\u8870\u6210\u5206\u5806\u53E0\u4EE3\u66FF\u8FD9\u4E9B\u4E60\u60EF\u3002" });
      if (!candidates.length) followUps.push(...base2.checks.filter((c) => ["calcium", "vitamin_d", "b12"].includes(c.id)));
      const uniqueChecks = followUps.filter((r, i, all) => all.findIndex((x) => x.id === r.id) === i);
      return {
        version: "goal-plan-v6",
        title: candidates.length ? "\u4E3A\u4F60\u7B5B\u9009\u7684\u8865\u5145\u5EFA\u8BAE" : "\u4F60\u7684\u4E0B\u4E00\u6B65\u8425\u517B\u5B89\u6392",
        summary: candidates.length ? "\u5148\u770B\u6700\u503C\u5F97\u8003\u8651\u7684\u51E0\u9879\uFF0C\u518D\u6309\u76EE\u6807\u9009\u62E9\u3002\u6BCF\u4E00\u9879\u90FD\u80FD\u5C55\u5F00\u770B\u4F9D\u636E\u3001\u98DF\u7269\u66FF\u4EE3\u4E0E\u6CE8\u610F\u4E8B\u9879\u3002" : "\u6839\u636E\u4F60\u76EE\u524D\u7684\u8BB0\u5F55\uFF0C\u5148\u505A\u597D\u4E0B\u9762\u7684\u5B89\u6392\uFF1B\u4E0D\u4F1A\u4E3A\u4E86\u51D1\u6570\u91CF\u52A0\u5165\u4E0D\u5408\u9002\u7684\u6210\u5206\u3002",
        highlights: candidates.slice(0, 3).map((c) => ({ id: c.id, title: c.title, tag: c.tag, rank: c.rank })),
        programs,
        cards: candidates,
        foodActions: compactFood,
        checks: uniqueChecks,
        checksExpanded: false,
        selectedCount: 0,
        selectedNames: "",
        selectionMessage: "",
        existingNote: existing.some((id) => !["none", "unknown"].includes(id)) ? "\u5DF2\u586B\u5199\u7684\u8865\u5145\u6210\u5206\u5DF2\u53C2\u4E0E\u7B5B\u9009\uFF0C\u4E0D\u91CD\u590D\u52A0\u5165\u3002" : "",
        emptyAction: adult ? "\u4FDD\u7559\u7A33\u5B9A\u7684\u996E\u98DF\u548C\u751F\u6D3B\u4E60\u60EF\uFF1B\u5982\u9700\u8981\u6838\u5BF9\u4FE1\u606F\uFF0C\u4E0B\u65B9\u4F1A\u5217\u51FA\u5177\u4F53\u4E0B\u4E00\u6B65\u3002" : base2.emptyAction,
        disclaimer: "\u8FD9\u662F\u6210\u5206\u5019\u9009\u5EFA\u8BAE\uFF0C\u4E0D\u662F\u8BCA\u65AD\u3001\u5904\u65B9\u6216\u6BCF\u65E5\u670D\u7528\u6E05\u5355\u3002\u9009\u62E9\u540E\u4ECD\u9700\u7ED3\u5408\u5177\u4F53\u4EA7\u54C1\u3001\u5242\u91CF\u548C\u76F8\u4E92\u4F5C\u7528\u786E\u8BA4\uFF1B\u4E0D\u81EA\u52A8\u4E0B\u5355\u3002"
      };
    }
    function updateSelection(report, id) {
      const target = report.cards.find((c) => c.id === id && c.selectable);
      if (!target) return report;
      const selecting = !target.selected;
      let replaced = false;
      const cards = report.cards.map((c) => {
        if (c.id === id) return { ...c, selected: selecting };
        const conflict = selecting && c.selected && (target.alternativeGroup && target.alternativeGroup === c.alternativeGroup || target.id === "multivitamin" && c.micronutrient || c.id === "multivitamin" && target.micronutrient);
        if (conflict) {
          replaced = true;
          return { ...c, selected: false };
        }
        return c;
      });
      const selected = cards.filter((c) => c.selected);
      return {
        ...report,
        cards,
        programs: report.programs.map((g) => ({ ...g, items: cards.filter((c) => c.group === g.id) })),
        selectedCount: selected.length,
        selectedNames: selected.map((c) => c.title).join("\u3001"),
        selectionMessage: replaced ? "\u5DF2\u66FF\u6362\u540C\u7C7B\u6216\u53EF\u80FD\u91CD\u53E0\u7684\u9009\u9879\uFF0C\u907F\u514D\u4E00\u8D77\u5806\u53E0\u3002" : ""
      };
    }
    module.exports = { buildRecommendationReport: buildRecommendationReport2, getReportSource: getReportSource2, updateSelection };
  }
});

// resources/bubu-source/engine/flow-v6.js
var require_flow_v6 = __commonJS({
  "resources/bubu-source/engine/flow-v6.js"(exports, module) {
    "use strict";
    var previous = require_flow_v5();
    var { QUESTIONS: QUESTIONS2, MODES } = require_questions_v6();
    var { buildRecommendationReport: buildRecommendationReport2 } = require_recommendations_v6();
    var list = (v) => Array.isArray(v) ? v : [];
    function buildQuestionPlan2(_mode, answers = {}) {
      const goals = list(answers.goals);
      let plan = previous.buildQuestionPlan("detailed", answers).map((q) => {
        if (q.id === "goal_priority") return { ...q, options: [...QUESTIONS2.goals.options.filter((o) => goals.includes(o.id) && o.id !== "none"), { id: "equal", label: "\u90FD\u4E00\u6837\u91CD\u8981" }] };
        return ["goals", "existing_sources", "safety"].includes(q.id) ? QUESTIONS2[q.id] : q;
      });
      if (previous.getSafetyDisposition(answers).status === "stop" || answers.audience === "minor_under_18") return plan;
      const selectedFields = QUESTIONS2.goal_context.fields.filter((f) => f.id === "energy" ? goals.some((id) => ["fatigue", "brain"].includes(id)) : f.id === "joint" ? goals.some((id) => ["joint", "endurance", "strength"].includes(id)) : f.id === "sleep_timing" ? goals.includes("sleep") : f.id === "gut_safety" ? goals.includes("gut") : goals.includes(f.id));
      if (selectedFields.length) plan.splice(plan.findIndex((q) => q.id === "diet_style"), 0, { ...QUESTIONS2.goal_context, fields: selectedFields });
      const at = plan.findIndex((q) => q.id === "existing_sources");
      const extras = [QUESTIONS2.supplement_scope];
      if ((answers.supplement_scope || {}).botanicals === "yes") extras.push(QUESTIONS2.botanical_safety);
      plan.splice(at, 0, ...extras);
      return plan;
    }
    function validateStep2(question, answer, answers = {}) {
      return previous.validateStep(typeof question === "string" ? QUESTIONS2[question] : question, answer, answers);
    }
    function buildQuestionnaireResult(_mode, answers = {}) {
      const safety = previous.getSafetyDisposition(answers);
      if (safety.status === "stop") return { mode: "detailed", safety, report: null };
      const incomplete = buildQuestionPlan2("detailed", answers).filter((q) => !validateStep2(q, answers[q.id], answers).valid);
      if (incomplete.length) return { mode: "detailed", safety, report: null, incomplete: incomplete.map((q) => q.id) };
      return { mode: "detailed", modeDefinition: MODES.detailed, safety, report: buildRecommendationReport2(answers) };
    }
    module.exports = { ...previous, buildQuestionPlan: buildQuestionPlan2, validateStep: validateStep2, buildQuestionnaireResult };
  }
});

// bubu-entry.js
var import_flow_v6 = __toESM(require_flow_v6());
var import_recommendations_v6 = __toESM(require_recommendations_v6());
var import_recommendations_v5 = __toESM(require_recommendations_v5());
var import_questions_v6 = __toESM(require_questions_v6());
var import_intake_screening = __toESM(require_intake_screening());
var { buildQuestionPlan, validateStep, getSafetyDisposition, normalizeMultiAnswer } = import_flow_v6.default;
var { buildRecommendationReport, getReportSource } = import_recommendations_v6.default;
var { buildPlanReport } = import_recommendations_v5.default;
var { QUESTIONS } = import_questions_v6.default;
var { NUTRIENTS } = import_intake_screening.default;
export {
  NUTRIENTS,
  QUESTIONS,
  buildPlanReport,
  buildQuestionPlan,
  buildRecommendationReport,
  getReportSource,
  getSafetyDisposition,
  normalizeMultiAnswer,
  validateStep
};
