# Deployment Checklist

## Pre-Deployment

- [ ] Update `.env` with production values
- [ ] Change admin master code (ADMIN_MASTER_CODE)
- [ ] Update support contact email and phone
- [ ] Update crypto wallet addresses
- [ ] Set up production database
- [ ] Configure email service (SMTP)
- [ ] Enable HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Run `npm run build`
- [ ] Test production build locally

## Frontend Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

### Custom Server
```bash
# Copy dist folder to server
scp -r dist/* user@server:/var/www/grants.gov/
```

## Backend Deployment

### Heroku
```bash
heroku create grants-gov-api
git push heroku main
heroku config:set ADMIN_MASTER_CODE=YOUR_CODE
heroku config:set JWT_SECRET=YOUR_SECRET
```

### Railway
```bash
railway link
railway up
```

### AWS/DigitalOcean
```bash
# Deploy using Docker or direct PM2
pm2 start server/index.ts --name "grants-api"
pm2 save
pm2 startup
```

## Post-Deployment

- [ ] Verify frontend loads correctly
- [ ] Test login/signup flow
- [ ] Test withdrawal process
- [ ] Verify admin panel access
- [ ] Check email notifications
- [ ] Monitor error logs
- [ ] Set up automated backups
- [ ] Configure CDN for static assets
- [ ] Enable security headers
- [ ] Set up SSL certificate auto-renewal

## Security Hardening

- [ ] Enable CORS only for trusted domains
- [ ] Add rate limiting to API
- [ ] Enable CSRF protection
- [ ] Add security headers (Helmet.js)
- [ ] Enable database encryption
- [ ] Set up Web Application Firewall (WAF)
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Monitor for vulnerabilities
- [ ] Implement audit logging

## Performance Optimization

- [ ] Enable gzip compression
- [ ] Set up CDN for assets
- [ ] Optimize images
- [ ] Enable caching headers
- [ ] Minify and bundle assets
- [ ] Monitor Core Web Vitals
- [ ] Set up monitoring/alerts
- [ ] Database query optimization
- [ ] Implement pagination
- [ ] Add Redis caching (optional)

## Monitoring & Logging

- [ ] Set up error tracking (Sentry)
- [ ] Configure log aggregation (ELK, Datadog)
- [ ] Set up uptime monitoring
- [ ] Configure alerting
- [ ] Monitor database performance
- [ ] Track user analytics
- [ ] Set up health checks
- [ ] Monitor API response times

## Maintenance

- [ ] Weekly backup verification
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Review and update Terms & Conditions
- [ ] Monitor support tickets
- [ ] Analyze user feedback
- [ ] Performance optimization
- [ ] Database maintenance

---

For detailed deployment instructions, see IMPLEMENTATION_GUIDE.md
