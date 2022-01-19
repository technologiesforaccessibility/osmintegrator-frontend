import React from 'react';

interface TabContentProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabContent = (props: TabContentProps) => {
  const {children, value, index} = props;

  return <>{value === index && <>{children}</>}</>;
};

export default TabContent;
