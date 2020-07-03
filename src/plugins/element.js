// Element-ui按需引入
import Vue from "vue";
import {
  Tabs,
  TabPane,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Tooltip,
  Dropdown,
  RadioGroup,
  RadioButton,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Message,
  Form,
  Table,
  Radio,
  Input,
  Dialog,
  Select,
  Option,
  Button,
  Divider,
  Loading,
  Checkbox,
  FormItem,
  DatePicker,
  Pagination,
  Breadcrumb,
  TableColumn,
  InputNumber,
  BreadcrumbItem
} from "element-ui";

Vue.use(Container)
  .use(Tabs)
  .use(TabPane)
  .use(Aside)
  .use(Header)
  .use(Main)
  .use(Menu)
  .use(Radio)
  .use(Table)
  .use(Dialog)
  .use(Select)
  .use(Option)
  .use(Divider)
  .use(MenuItem)
  .use(Submenu)
  .use(DatePicker)
  .use(Pagination)
  .use(RadioGroup)
  .use(RadioButton)
  .use(InputNumber)
  .use(MenuItemGroup)
  .use(Tooltip)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Button)
  .use(Checkbox)
  .use(Breadcrumb)
  .use(TableColumn)
  .use(BreadcrumbItem)
  .use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
