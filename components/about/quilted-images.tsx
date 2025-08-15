import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'headshot_IS_square.jpg',
    title: 'Vin Jones Headshot',
    rows: 2,
    cols: 2,
  },
  {
    img: '20230805_120352.jpg',
    title: 'Vin & Rachel Hiking',
  },
  {
    img: '20231014_103403.jpg',
    title: 'Vin & Rachel Eclipse',
  },
  {
    img: '20231206_195628.jpg',
    title: 'Vin & Rachel with a Local Band',
    cols: 2,
  },
  {
    img: '20240410_172039.jpg',
    title: 'Battlebot Prototype',
    cols: 2,
  },
  {
    img: '20250628_205236.jpg',
    title: 'Sunset on the Puget Sound',
    rows: 2,
    cols: 2,
  },
  {
    img: '1000006244_20231215090339.jpg',
    title: 'Vin at Universal in Orlando',
  },
  {
    img: 'IMG_1721.jpeg',
    title: 'Sumo Robot Battle!',
  },
  {
    img: 'IMG_20230814_170609_01.jpg',
    title: 'A Fun Project',
    rows: 2,
    cols: 2,
  },
  {
    img: 'Moab Wedding-592.jpg',
    title: 'A Cool Wedding Photo',
    rows: 2,
    cols: 2,
  },
];