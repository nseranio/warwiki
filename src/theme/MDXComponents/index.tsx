import React from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import OriginalImg from '@theme/MDXComponents/Img';
import ClinicalFigure from '../../components/ClinicalFigure';
import {findFigure} from '../../data/figures';

function FigureAwareImage(props: React.ImgHTMLAttributes<HTMLImageElement>): React.ReactElement {
  const figure = findFigure(props.src);
  return figure ? <ClinicalFigure {...props} figure={figure} /> : <OriginalImg {...props} />;
}

// Markdown tables scroll inside a wrapper so the table itself can fill the
// column; a table set to display:block left its rows short of the frame.
function ScrollableTable(props: React.TableHTMLAttributes<HTMLTableElement>): React.ReactElement {
  return <div className="wk-table-scroll"><table {...props} /></div>;
}

export default {...OriginalComponents, img: FigureAwareImage, table: ScrollableTable};
