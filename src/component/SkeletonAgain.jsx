import React from "react";
import { Skeleton } from 'antd-mobile'
import './SkeletonAgain.less'

const SkeletonAgain = function() {

  return <div className="Skeleton-Again-box">
            <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
  </div>
}

export default SkeletonAgain;