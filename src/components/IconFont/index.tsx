
export type IconProps = {

};

export type IconRealKey = 'GithubOutlined' | 'FileOutlined';
export type IconKey = IconRealKey | `icon-${string}`;

export interface IconFontProps extends IconProps {
  icon: IconKey;
}

/**
 * antd icon font
 * @param props
 * @returns
 */
export default function IconFont(props: IconFontProps) {


  return <div>图标</div>
}
