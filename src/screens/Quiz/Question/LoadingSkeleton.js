import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import Card from '../../../components/Card';

function LoadingSkeleton() {
  return (
    <Card>
      <CardContent>
        {Array(6)
          .fill()
          .map((e, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} animation="wave" height={60} />
          ))}
      </CardContent>
    </Card>
  );
}

export default LoadingSkeleton;
