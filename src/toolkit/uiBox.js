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
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Message,
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  Breadcrumb,
  BreadcrumbItem
} from "element-ui";

Vue.use(Container)
  .use(Aside)
  .use(Header)
  .use(Main)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)
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
  .use(BreadcrumbItem);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
