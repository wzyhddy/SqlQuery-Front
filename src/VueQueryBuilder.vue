<template>
    <div class="vue-query-builder">
        <slot v-bind="vqbProps">
            <query-builder-group
                    v-bind="vqbProps"
                    :query.sync="query"
            />
        </slot>
        <br> 
    </div>
</template>

<script>
    /* eslint-disable vue/require-default-prop */
    import QueryBuilderGroup from './layouts/Bootstrap/BootstrapGroup.vue';
    import deepClone from './utilities.js';

    var defaultLabels = {
        matchType: "Match Type",
        matchTypes: [
            {"id": "and", "label": "AND"},
            {"id": "or", "label": "OR"},
        ],
        addRule: "Add Rule",
        removeRule: "&times;",
        addGroup: "Add Group",
        removeGroup: "&times;",
        textInputPlaceholder: "value",
    };

    export default {
        name: 'VueQueryBuilder',

        components: {
            QueryBuilderGroup
        },

        props: {
            rules: Array,
            labels: {
                type: Object,
                default() {
                    return defaultLabels;
                }
            },
            maxDepth: {
                type: Number,
                default: 3,
                validator: function (value) {
                    return value >= 1
                }
            },
            value: Object
        },

        data() {
            return {
                query: {
                    logicalOperator: this.labels.matchTypes[0].id,
                    children: []
                },
                ruleTypes: {
                    "text": {
                        operators: ['=','!=', '<', '<=', '>', '>=',
                         'is null', 'is not null'],
                        inputType: "text",
                        id: "text-field"
                    },
                    "numeric": {
                        operators: ['=', '<>', '<', '<=', '>', '>='],
                        inputType: "number",
                        id: "number-field"
                    },
                    "custom": {
                        operators: [],
                        inputType: "text",
                        id: "custom-field"
                    },
                    "radio": {
                        operators: ['='],
                        choices: [],
                        inputType: "radio",
                        id: "radio-field"
                    },
                    "checkbox": {
                        operators: [],
                        choices: [],
                        inputType: "checkbox",
                        id: "checkbox-field"
                    },
                    "select": {
                        operators: [],
                        choices: [],
                        inputType: "select",
                        id: "select-field"
                    },
                    "multi-select": {
                        operators: ['='],
                        choices: [],
                        inputType: "select",
                        id: "multi-select-field"
                    },
                },
                sql: ''
            }
        },

        computed: {
            mergedLabels() {
                return Object.assign({}, defaultLabels, this.labels);
            },

            mergedRules() {
                var mergedRules = [];
                var vm = this;

                vm.rules.forEach(function (rule) {
                    if (typeof vm.ruleTypes[rule.type] !== "undefined") {
                        mergedRules.push(Object.assign({}, vm.ruleTypes[rule.type], rule));
                    } else {
                        mergedRules.push(rule);
                    }
                });

                return mergedRules;
            },

            vqbProps() {
                return {
                    index: 0,
                    depth: 1,
                    maxDepth: this.maxDepth,
                    ruleTypes: this.ruleTypes,
                    rules: this.mergedRules,
                    labels: this.mergedLabels
                }
            }
        },

        mounted() {
            this.$watch(
                'query',
                newQuery => {
                    if (JSON.stringify(newQuery) !== JSON.stringify(this.value)) {
                        this.$emit('input', deepClone(newQuery));
                        //add by wxg.
                        this.$emit('sql', this.queryToSql(newQuery));
                    }
                }, {
                    deep: true
                });

            this.$watch(
                'value',
                newValue => {
                    if (JSON.stringify(newValue) !== JSON.stringify(this.query)) {
                        this.query = deepClone(newValue);
                    }
                }, {
                    deep: true
                });

            if (typeof this.$options.propsData.value !== "undefined") {
                this.query = Object.assign(this.query, this.$options.propsData.value);
            }
        },
        //add by wxg.
        methods: {


            queryToSql(query) {
                var sql = [];
                var that = this;
                var logicalOperator = query.logicalOperator;
                var children = query.children;
                children.forEach((child) => {
                    var type = child.type;
                    if (type === 'query-builder-rule') {
                        sql.push(child.query.rule);
                        sql.push(child.query.operator);

                        if(child.query.operator==="is not null" ){
                           
                        }else if(child.query.operator==="is null"){

                        }
                        else{
                            sql.push("'"+child.query.value+"'");
                        }
                   
                    } else {
                        sql.push('(');
                        sql.push(that.queryToSql(child.query));
                        sql.push(')');
                    }
                    sql.push(logicalOperator);
                })
                sql.splice(sql.length - 1, sql.length);
                return sql.join(' ');
            },
            open() {
           //     this.$axios.get("http://jsonplaceholder.typicode.com/posts/2")
           this.$axios.get("http://localhost:8030/query/test/123")
            .then((res) => {
                console.log(res)
                console.log(this.sql)
                this.$message(this.sql);
            });

      },
        }
    }
</script>
