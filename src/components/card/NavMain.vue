<template>
  <div class="view">
    <header>
      <VMHeader />
    </header>
    <main>
      <nav>
        <ul v-cloak>
          <li v-for="child in childRoute"
              :key="child.path"
              :class="{'active':child.name==selectName}"
              @click="goChild(child)">
            <label>
              <span>{{child.name}}</span>
              <span class="line"></span>
            </label>
          </li>
        </ul>
      </nav>
      <section>
        <router-view />
      </section>
    </main>
    <footer>
      <VMFooter />
    </footer>
  </div>
</template>

<script>
import VMHeader from "./Header.vue";
import VMFooter from "./Footer.vue";

export default {
  data () {
    return {
      parentPath: "",
      selectName: "",
      childRoute: []
    };
  },
  components: {
    VMHeader,
    VMFooter
  },
  mounted () {
    // eslint-disable-next-line
    // debugger;
    if (this.$route.matched.length > 1) {
      this.selectName = this.$route.name;
    }
    let match = this.$route.matched[0];
    this.parentPath = match.path;
    let currentRoute = this.$router.options.routes.find(
      r => r.path == match.path
    );
    if (currentRoute) {
      this.childRoute = currentRoute.children;
      if (this.childRoute.length > 0) {
        this.$router.push({
          path: this.parentPath + "/" + this.childRoute[0].path
        });
        this.selectName = this.childRoute[0].name;
      }
    }
  },
  methods: {
    goChild (route) {
      this.selectName = route.name;
      this.$router.push({
        path: this.parentPath + "/" + route.path
      });
    }
  }
};
</script>

<style lang="scss" scope>
@headerHeight: 68px;
@footerHheight: 24px;
.view {
  position: relative;
  width: 100%;
  height: 100%;

  header {
    width: 100%;
    height: @headerHeight;
    background: #e6eef1;
  }

  footer {
    position: absolute;
    width: 100%;
    height: @footerHheight;
    line-height: @footerHheight;
    bottom: 0;
  }

  main {
    position: absolute;
    width: 100%;
    top: @headerHeight;
    bottom: @footerHheight;

    nav {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 42px;
      z-index: 501;
      line-height: 42px;
      background: #e6eef1;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
      li {
        position: relative;
        display: inline-block;
        width: 260px;
        font-size: 20px;
        color: #26265d;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        font-family: "cf_MsYh", sans-serif;
        font-weight: 500;

        label {
          display: inline-block;
          width: 100%;
          line-height: 1;
          border-left: 1px solid rgba(38, 38, 93, 0.5);
          cursor: pointer;

          span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
          }

          .line {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 0;
            padding: 0;
            background: linear-gradient(356deg, #1b8ecd, #0067d9);
            animation: all 0.3s ease-in-out;
          }
        }

        &:first-child {
          label {
            border-color: transparent;
          }
        }

        &:hover {
          color: #4665cc;
          // background: linear-gradient(transparent, #cad7f4);

          .line {
            animation-name: widthCollapse;
            width: 100%;
          }
        }

        &.active {
          font-size: 22px;
          font-weight: bold;
          color: #4765cd;
          background: linear-gradient(transparent, #cad7f4);
          font-weight: bolder;

          label {
            border-color: transparent;

            .line {
              animation-name: widthCollapse;
              width: 100%;
            }
          }

          & + li {
            label {
              border-color: transparent;
            }
          }
        }
      }
    }

    > section {
      position: absolute;
      top: 44px;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>