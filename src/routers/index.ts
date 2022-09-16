import { Router } from 'express';

const router: Router = Router();
router.get('/', (req, res) => {
  console.log('Test route');
  return res.send('Its working');
})

export default router;
