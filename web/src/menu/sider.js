// 菜单，侧边栏
import affairs_center from './modules/affairs_center';
import study_center from './modules/study_center';
import activity_center from './modules/activity_center';
import setting from './modules/setting';

export default [
  ...affairs_center,
  ...study_center,
  ...activity_center,
  ...setting
]