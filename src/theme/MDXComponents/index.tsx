import React from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import OriginalImg from '@theme/MDXComponents/Img';
import ClinicalFigure from '../../components/ClinicalFigure';
import {findFigure} from '../../data/figures';

function FigureAwareImage(props: React.ImgHTMLAttributes<HTMLImageElement>): React.ReactElement {
  const figure = findFigure(props.src);
  return figure ? <ClinicalFigure {...props} figure={figure} /> : <OriginalImg {...props} />;
}

export default {...OriginalComponents, img: FigureAwareImage};
