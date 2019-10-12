import Vue from 'vue';
import { PageHeader,Row,Col,Menu,Submenu,MenuItem,MenuItemGroup,Container,Header,Aside,Main,Footer,RadioGroup, Input,Button,
  Dropdown,DropdownItem,DropdownMenu,Dialog,Form,FormItem,Image,Carousel,CarouselItem,Divider,Card,Table,TableColumn,
  Pagination,Tabs,TabPane,Upload,Select,Option,Collapse,CollapseItem,Message,MessageBox,Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(PageHeader);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);
Vue.use(RadioGroup);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Image);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Divider);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Option);
Vue.use(Collapse);
Vue.use(CollapseItem);

Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$loading = Loading;
