import express from 'express';
import UserAppService from './application/UserAppService';
import UserUpdate from './domain/UserUpdate';

const router = express.Router();


/**
 * get All
 */
router.get('/', async (req, res) => {
    const userAppService = new UserAppService();

    const response = await userAppService.getAll();

    console.log('get', response);

    res.json(response);
});

/**
 * Get All Public Model
 */
router.get('/public', async (req, res) => {
    const userAppService = new UserAppService();

    const response = await userAppService.getAllPublic();

    console.log('get Public', response);

    res.json(response);
});

/**
 * get User (id)
 */
router.get('/:id', async (req, res) => {
    const userAppService = new UserAppService();
    const { id } = req.params;

    const response = await userAppService.get(id);

    console.log(`get/${id}`, response);

    res.json(response);
});

/**
 * get User (id)
 */
router.get('/public/:id', async (req, res) => {
    const userAppService = new UserAppService();
    const { id } = req.params;

    const response = await userAppService.getPublic(id);

    console.log(`get/${id}`, response);

    res.json(response);
});

/**
 * delete user
 */
router.delete('/:id', async (req, res) => {
    const userAppService = new UserAppService();
    const { id } = req.params;

    const response = userAppService.delete(id);

    console.log(`delete/${id}`, response);

    res.json(response);
});

/**
 * create user
 */
router.post('/', async (req, res) => {
    const userAppService = new UserAppService();
    const { name, username, birthday, email } = req.body;

    const response = await userAppService.create({ name, username, birthday, email });

    console.log(response);

    res.json(response);
});

/**
 * Update User Data
 */
router.put('/', async (req, res) => {
    const userAppService = new UserAppService();
    const { id, username, email } = req.body; // <UserUpdate>

    const response = await userAppService.update({ id, username, email });

    console.log(response);

    res.json(response);
});

export { router as UserRouter };
