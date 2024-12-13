import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/simpan', async (req, res) => {
    const { tanggal, jam } = req.body;

    try {
        const { data, error } = await supabase
            .from('timer')
            .insert([{ tanggal, jam }]);

        if (error) {
            throw error;
        }

        res.redirect('/');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Gagal menyimpan data.');
    }
});

app.get('/latest-timer', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('timer')
            .select('tanggal, jam')
            .order('id', { ascending: false })
            .limit(1);

        if (error) {
            throw error;
        }

        if (data.length > 0) {
            res.json(data[0]);
        } else {
            res.json({ error: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching latest timer:', error);
        res.status(500).json({ error: 'Failed to fetch latest timer data' });
    }
});

app.listen(port, () => {
    console.log(`API server running on port ${port}`);
});

export default app;
