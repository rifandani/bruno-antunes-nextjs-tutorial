import { CarModel } from '../../../api/Car';
import { GetStaticProps } from 'next';
import { openDB } from '../../openDB';
import Link from 'next/link';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface SsgcarsProps {
  cars: CarModel[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    container: {
      flexGrow: 1,
      marginTop: '2rem',
    },
    media: {
      height: 140,
    },
    // paper: {
    //   padding: theme.spacing(2),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // },
  }),
);

export default function Ssgcars({ cars }: SsgcarsProps) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className="container">
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={3} key={car.id}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={car.photoUrl}
                  title={car.make}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {car.model}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {car.details}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link href="/ssgcars/car/[id]" as={`/ssgcars/car/${car.id}`}>
                    <a>${car.price}</a>
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // pagination to only display 5 cars
  const currentPage = ctx.params?.currentPage as string;
  const currentPageNumber = +(currentPage || 0); // parseInt(), Number()
  const min = currentPageNumber * 5;
  const max = (currentPageNumber + 1) * 5;

  const db = await openDB();
  const cars = await db.all(
    'SELECT * FROM Car WHERE id > ? AND id <= ?',
    min,
    max,
  ); //return array of cars

  return {
    props: {
      cars,
    },
  };
};
