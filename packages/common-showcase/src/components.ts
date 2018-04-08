import Button from './examples/Button.example';
import Callout from './examples/Callout.example';
import Card from './examples/Card.example';
import Checkbox from './examples/Checkbox.example';
import Collapser from './examples/Collapser.example';
import ContextMenu from './examples/ContextMenu.example';
import DeleteButton from './examples/DeleteButton.example';
import Dialog from './examples/Dialog.example';
import EmptyState from './examples/EmptyState.example';
import ErrorState from './examples/ErrorState.example';
import Form from './examples/Form.example';
import Group from './examples/Group.example';
import IconButton from './examples/IconButton.example';
import ImageUpload from './examples/ImageUpload.example';
import KeyboardShortcut from './examples/KeyboardShortcut.example';
import Label from './examples/Label.example';
import Link from './examples/Link.example';
import LoadingState from './examples/LoadingState.example';
import PaddingInput from './examples/PaddingInput.example';
import ProBadge from './examples/ProBadge.example';
import Radio from './examples/Radio.example';
import Range from './examples/Range.example';
import Select from './examples/Select.example';
import SlugInput from './examples/SlugInput.example';
import Spinner from './examples/Spinner.example';
import StickyHeader from './examples/StickyHeader.example';
import Switch from './examples/Switch.example';
import Tabs from './examples/Tabs.example';
import Tag from './examples/Tag.example';
import Text from './examples/Text.example';
import TextArea from './examples/TextArea.example';
import TextInput from './examples/TextInput.example';

export interface Component {
  name: string;
  examples: Array<{
    dark?: boolean;
    title: string;
    render: () => JSX.Element;
  }>;
}

export default {
  Button,
  Callout,
  Card,
  Checkbox,
  Collapser,
  ContextMenu,
  DeleteButton,
  Dialog,
  EmptyState,
  ErrorState,
  Form,
  Group,
  IconButton,
  ImageUpload,
  KeyboardShortcut,
  Label,
  Link,
  LoadingState,
  PaddingInput,
  ProBadge,
  Radio,
  Range,
  Select,
  SlugInput,
  Spinner,
  StickyHeader,
  Switch,
  Tabs,
  Tag,
  Text,
  TextArea,
  TextInput,
} as {
  [component: string]: Component;
};
