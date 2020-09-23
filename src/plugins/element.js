// Element-ui按需引入
import Vue from "vue";
import {
  Container,
  Aside,
  Header,
  Main,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Dropdown,
  RadioGroup,
  RadioButton,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Message,
  Form,
  Radio,
  Input,
  Button,
  Loading,
  Checkbox,
  FormItem,
  Pagination,
  Breadcrumb,
  InputNumber,
  BreadcrumbItem
} from "element-ui";

Vue.use(Container)
  .use(Aside)
  .use(Header)
  .use(Main)
  .use(Menu)
  .use(Radio)
  .use(MenuItem)
  .use(Submenu)
  .use(Pagination)
  .use(RadioGroup)
  .use(RadioButton)
  .use(InputNumber)
  .use(MenuItemGroup)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Button)
  .use(Checkbox)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
