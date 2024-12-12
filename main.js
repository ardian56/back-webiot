import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const SUPABASE_URL = 'https://bnohnwaewyhlctftcpqz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJub2hud2Fld3lobGN0ZnRjcHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzExMTIsImV4cCI6MjA0OTU0NzExMn0.gnElfIw4eLBUFRMLWovUY1ayalD4lJiSkSSt5WtgD2I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/simpan', async (req, res) => {
    const { tanggal, jam } = req.body;

    try {
        const { data, error } = await supabase
            .from('timer')
            .insert([
                { tanggal: tanggal, jam: jam }
            ]);

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


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
