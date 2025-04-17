document.addEventListener("DOMContentLoaded", () => {
    // Update current time
    function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
      document.getElementById('current-time').textContent = timeString;
    }
    setInterval(updateTime, 1000);
    updateTime();
  
    // Preview data
    const previews = [
      {
        id: 1,
        img: "./images/main-1.png",
        title: "Social Media",
        tags: "Engagement, Brand Awareness",
        description: "Comprehensive social media strategies to boost your online presence and engagement."
      },
      {
        id: 2,
        img: "./images/main-2.webp",
        title: "Web Development",
        tags: "Responsive, Modern Design",
        description: "Custom websites built with the latest technologies for optimal performance."
      },
      {
        id: 3,
        img: "./images/main-3.png",
        title: "Mobile Apps",
        tags: "iOS & Android, User Experience",
        description: "Native and cross-platform mobile applications tailored to your business needs."
      },
      {
        id: 4,
        img: "./images/main-4.png",
        title: "SEO Optimization",
        tags: "Ranking, Visibility",
        description: "Improve your search engine rankings and drive organic traffic to your site."
      },
      {
        id: 5,
        img: "./images/0afa99cf8417c0d2c25a2c9431e5de596a766400-2500x1500.webp",
        title: "Influencers Marketing",
        tags: "Outreach, Campaigns",
        description: "Leverage influencer partnerships to expand your brand's reach."
      },
      {
        id: 6,
        img: "./images/208a2cb078bebd3b98741ca1518b90a70deb1000-1400x2500.png",
        title: "SMS Campaigns",
        tags: "Direct Marketing, Engagement",
        description: "Targeted SMS campaigns for immediate customer communication."
      },
      {
        id: 7,
        img: "./images/330c78b53227875c8f8db11daf0c8af94a01fbe1-2500x1500.png",
        title: "Media Production",
        tags: "Video, Photography",
        description: "High-quality media production for all your marketing needs."
      }
    ];
  
    // Create preview elements
    const previewsContainer = document.querySelector('.preview-overlays');
    
    previews.forEach(preview => {
      const previewElement = document.createElement('div');
      previewElement.className = 'preview';
      previewElement.dataset.previewId = preview.id;
      
      previewElement.innerHTML = `
        <div class="preview-img">
          <img src="${preview.img}" alt="${preview.title}">
        </div>
        <div class="preview-title">
          <h1>${preview.title}</h1>
        </div>
        <div class="preview-tags">
          <p>${preview.tags}</p>
        </div>
        <div class="preview-description">
          <p>${preview.description}</p>
        </div>
      `;
      
      previewsContainer.appendChild(previewElement);
    });
  
    // Interactive functionality
    const items = document.querySelectorAll('.item');
    const previewBg = document.querySelector('.preview-bg img');
    let activePreview = null;
  
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const previewId = item.dataset.preview;
        const preview = document.querySelector(`.preview[data-preview-id="${previewId}"]`);
        const previewData = previews.find(p => p.id == previewId);
        
        // Change background
        gsap.to(previewBg, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            previewBg.src = previewData.img;
            gsap.to(previewBg, { opacity: 0.3, duration: 0.3 });
          }
        });
        
        // Hide previous preview
        if (activePreview) {
          activePreview.classList.remove('active');
          gsap.to(activePreview.querySelector('.preview-img'), {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            duration: 0.5
          });
          gsap.to(activePreview.querySelector('.preview-title'), {
            x: 75,
            opacity: 0,
            duration: 0.5
          });
          gsap.to(activePreview.querySelector('.preview-tags'), {
            y: -75,
            opacity: 0,
            duration: 0.5
          });
          gsap.to(activePreview.querySelector('.preview-description'), {
            x: -75,
            opacity: 0,
            duration: 0.5
          });
          
        }
        
        // Show new preview
        preview.classList.add('active');
        gsap.to(preview.querySelector('.preview-img'), {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.5
        });
        gsap.to(preview.querySelector('.preview-title'), {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.1
        });
        gsap.to(preview.querySelector('.preview-tags'), {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2
        });
        gsap.to(preview.querySelector('.preview-description'), {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.3
        });
        
            activePreview = preview;
      });
      
      item.addEventListener('mouseleave', () => {
        if (!activePreview) return;
        
        resetPreview(activePreview, () => {
            activePreview = null;
            
            gsap.to(activePreview.querySelector('.preview-img'), {
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              duration: 0.5
            });
            gsap.to(activePreview.querySelector('.preview-title'), {
              x: 75,
              opacity: 0,
              duration: 0.5
            });
            gsap.to(activePreview.querySelector('.preview-tags'), {
              y: -75,
              opacity: 0,
              duration: 0.5
            });
            gsap.to(activePreview.querySelector('.preview-description'), {
              x: -75,
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                activePreview.classList.remove('active');
                activePreview = null;
                
                // Reset background to default
                gsap.to(previewBg, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                    previewBg.src = "./images/1.png";
                    gsap.to(previewBg, { opacity: 0.3, duration: 0.3 });
                  }
                });
              }
            });
          });
      });
    });
  });